import { useEffect, useState } from "react";
import * as THREE from "three";

import { drawImageCover, loadImage } from "../lib/screenTexture";

interface SlideshowOptions {
  // Time each image stays on screen (ms)
  interval?: number;
  // Crossfade duration (ms)
  fade?: number;
  // Places an image on the canvas (defaults to cover-fit)
  drawImage?: (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => void;
  // Drawn on top of every frame (e.g. the Dynamic Island)
  overlay?: (ctx: CanvasRenderingContext2D) => void;
}

/*
  Canvas texture that cycles through `images` with a crossfade (a single image
  is just shown). Size the canvas to the aspect ratio of the screen.
  Pass stable (module-level or memoized) options.
*/
export const useSlideshowTexture = (
  width: number,
  height: number,
  images: readonly string[],
  {
    interval = 2500,
    fade = 500,
    drawImage = drawImageCover,
    overlay,
  }: SlideshowOptions = {}
) => {
  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#010103";
      ctx.fillRect(0, 0, width, height);
    }

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.anisotropy = 8;
    return canvasTexture;
  });

  useEffect(() => {
    const ctx = texture.image.getContext("2d");
    if (!ctx || images.length === 0) return;

    let cancelled = false;
    let timer: number | undefined;
    let frame: number | undefined;

    const render = (
      current: HTMLImageElement,
      next?: HTMLImageElement,
      t = 0
    ) => {
      // Clear first so transparent parts (e.g. rounded corners) don't keep
      // pixels from the previous image
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#010103";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawImage(ctx, current);
      if (next) {
        ctx.globalAlpha = t;
        drawImage(ctx, next);
        ctx.globalAlpha = 1;
      }
      overlay?.(ctx);
      texture.needsUpdate = true;
    };

    void Promise.all(images.map((src) => loadImage(src)))
      .then((loaded) => {
        if (cancelled) return;

        let index = 0;
        render(loaded[index]);
        if (loaded.length < 2) return;

        const advance = () => {
          const current = loaded[index];
          const nextIndex = (index + 1) % loaded.length;
          const next = loaded[nextIndex];
          const start = performance.now();

          const step = (now: number) => {
            if (cancelled) return;
            const t = Math.min((now - start) / fade, 1);
            render(current, next, t);

            if (t < 1) {
              frame = requestAnimationFrame(step);
            } else {
              index = nextIndex;
              timer = window.setTimeout(advance, interval);
            }
          };
          frame = requestAnimationFrame(step);
        };

        timer = window.setTimeout(advance, interval);
      })
      // A missing image leaves the screen blank rather than crashing the scene
      .catch(() => undefined);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [texture, images, interval, fade, drawImage, overlay]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
};
