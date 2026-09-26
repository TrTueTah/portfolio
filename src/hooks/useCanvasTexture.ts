import { useEffect, useState } from "react";
import * as THREE from "three";

export type CanvasDraw<T> = (
  ctx: CanvasRenderingContext2D,
  data: T
) => void | Promise<void>;

/*
  Texture backed by a 2D canvas, (re)drawn whenever `data` changes.
  Size the canvas to the aspect ratio of the screen it is shown on.
  `draw` should be a stable (module-level) function.
*/
export const useCanvasTexture = <T>(
  width: number,
  height: number,
  draw: CanvasDraw<T>,
  data: T
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
    if (!ctx) return;

    let cancelled = false;
    void Promise.resolve(draw(ctx, data)).then(() => {
      if (!cancelled) texture.needsUpdate = true;
    });

    return () => {
      cancelled = true;
    };
  }, [texture, draw, data]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
};
