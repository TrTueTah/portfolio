import type { aboutIntro, Project } from "../constants";

const FONT = '"General Sans", sans-serif';

export const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

// Fill the whole canvas with the image, cropping the overflow (CSS "cover")
export const drawImageCover = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
) => {
  const { width, height } = ctx.canvas;
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
};

const WINDOW_BAR_HEIGHT = 72;

// Browser-style window chrome along the top of a laptop screen
const drawWindowBar = (ctx: CanvasRenderingContext2D, title: string) => {
  const { width } = ctx.canvas;

  ctx.fillStyle = "#0e0e10";
  ctx.fillRect(0, 0, width, WINDOW_BAR_HEIGHT);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(48 + i * 40, WINDOW_BAR_HEIGHT / 2, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#62646c";
  ctx.font = `500 30px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, width / 2, WINDOW_BAR_HEIGHT / 2);
};

// Screenshot shown in full inside a browser window (fit to width, no crop)
export const drawImageInWindow = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  title: string
) => {
  const { width, height } = ctx.canvas;
  const areaHeight = height - WINDOW_BAR_HEIGHT;
  const scale = Math.min(width / image.width, areaHeight / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;

  ctx.fillStyle = "#010103";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(
    image,
    (width - drawWidth) / 2,
    WINDOW_BAR_HEIGHT + (areaHeight - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
  drawWindowBar(ctx, title);
};

// Dynamic Island for the iPhone screen (canvas sized deviceScreenSizes.iphone)
export const drawPhoneIsland = (ctx: CanvasRenderingContext2D) => {
  const { width } = ctx.canvas;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(width / 2 - 144, 25, 288, 83, 42);
  ctx.fill();
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) =>
  text.split(" ").reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1] as string | undefined;
    if (
      last !== undefined &&
      ctx.measureText(`${last} ${word}`).width <= maxWidth
    ) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
    return lines;
  }, []);

// Background + window chrome, drawn right away so the screen is never blank
const drawScreenFrame = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;

  ctx.fillStyle = "#010103";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#0e0e10";
  ctx.fillRect(0, 0, width, 72);

  ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(48 + i * 40, 36, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#62646c";
  ctx.font = `500 30px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("tanhtran.dev/#about", width / 2, 36);
};

// Preview of the About section's intro card, centered so it still reads
// when only the middle of the screen is in view
export const drawScreenContent = async (
  ctx: CanvasRenderingContext2D,
  intro: typeof aboutIntro
) => {
  await Promise.all([
    document.fonts.load(`600 88px ${FONT}`),
    document.fonts.load(`400 40px ${FONT}`),
  ]).catch(() => undefined);
  const image = await loadImage(intro.image).catch(() => null);

  const { width, height } = ctx.canvas;
  const imageHeight = image ? 440 : 0;
  const imageGap = image ? 110 : 0;

  ctx.font = `400 40px ${FONT}`;
  const lines = wrapText(ctx, intro.description, 1300);

  // Vertically center image + title + description below the title bar
  const contentHeight = imageHeight + imageGap + 80 + lines.length * 56;
  let y = 72 + (height - 72 - contentHeight) / 2;

  drawScreenFrame(ctx);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const centerX = width / 2;

  if (image) {
    const imageWidth = (image.width / image.height) * imageHeight;
    ctx.drawImage(image, centerX - imageWidth / 2, y, imageWidth, imageHeight);
    y += imageHeight + imageGap;
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 88px ${FONT}`;
  ctx.fillText(intro.title, centerX, y);
  y += 80;

  ctx.fillStyle = "#afb0b6";
  ctx.font = `400 40px ${FONT}`;
  lines.forEach((line) => {
    ctx.fillText(line, centerX, y);
    y += 56;
  });

  ctx.fillStyle = "#62646c";
  ctx.font = `500 30px ${FONT}`;
  ctx.fillText("Scroll to explore ↓", centerX, height - 48);
};

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

/*
  Placeholder "app screen" for a project, laid out for a laptop (landscape)
  or phone (portrait) canvas. Swap for real screenshots when available.
*/
export const drawProjectScreen = async (
  ctx: CanvasRenderingContext2D,
  project: Project
) => {
  await Promise.all([
    document.fonts.load(`600 80px ${FONT}`),
    document.fonts.load(`400 40px ${FONT}`),
  ]).catch(() => undefined);

  const { width, height } = ctx.canvas;
  const isPhone = height > width;
  const centerX = width / 2;
  const scale = isPhone ? 1.1 : 1;

  // Background with a soft glow in the project's accent color
  ctx.fillStyle = "#010103";
  ctx.fillRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(
    centerX,
    height * 0.35,
    0,
    centerX,
    height * 0.35,
    Math.max(width, height) * 0.6
  );
  glow.addColorStop(0, `${project.accent}55`);
  glow.addColorStop(1, "#01010300");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (isPhone) {
    // Dynamic Island, status bar and home indicator
    drawPhoneIsland(ctx);

    ctx.fillStyle = "#ffffff";
    ctx.font = `600 44px ${FONT}`;
    ctx.textAlign = "left";
    ctx.fillText("9:41", 90, 110);
    ctx.textAlign = "center";
    roundRect(ctx, width - 170, 92, 80, 36, 10);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();
    roundRect(ctx, width - 164, 98, 58, 24, 6);
    ctx.fill();

    roundRect(ctx, centerX - 150, height - 60, 300, 12, 6);
    ctx.fill();
  } else {
    drawWindowBar(ctx, project.company);
  }

  const textWidth = isPhone ? width - 160 : 1300;

  ctx.font = `400 ${40 * scale}px ${FONT}`;
  const lines = wrapText(ctx, project.tagline, textWidth);

  // Logo badge, title, tagline and tech chips, centered as a block
  const badge = 180 * scale;
  const blockHeight =
    badge + 80 * scale + 90 * scale + lines.length * 56 * scale + 150 * scale;
  let y = (height - blockHeight) / 2 + (isPhone ? 40 : 36);

  roundRect(ctx, centerX - badge / 2, y, badge, badge, 44 * scale);
  ctx.fillStyle = project.accent;
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 ${76 * scale}px ${FONT}`;
  ctx.fillText(project.initials, centerX, y + badge / 2);
  y += badge + 80 * scale;

  ctx.font = `600 ${(isPhone ? 64 : 80) * scale}px ${FONT}`;
  wrapText(ctx, project.name, textWidth).forEach((line) => {
    ctx.fillText(line, centerX, y);
    y += 90 * scale;
  });

  ctx.fillStyle = "#afb0b6";
  ctx.font = `400 ${40 * scale}px ${FONT}`;
  lines.forEach((line) => {
    ctx.fillText(line, centerX, y);
    y += 56 * scale;
  });
  y += 60 * scale;

  // Tech chips, wrapped into rows
  ctx.font = `500 ${30 * scale}px ${FONT}`;
  const chipHeight = 60 * scale;
  const gap = 20 * scale;
  const chips = project.tags.map(({ name }) => ({
    name,
    width: ctx.measureText(name).width + 50 * scale,
  }));
  const rows: (typeof chips)[] = [[]];
  chips.forEach((chip) => {
    const row = rows[rows.length - 1];
    const rowWidth = row.reduce((sum, c) => sum + c.width + gap, 0);
    if (row.length && rowWidth + chip.width > textWidth) rows.push([chip]);
    else row.push(chip);
  });
  rows.forEach((row) => {
    const rowWidth =
      row.reduce((sum, c) => sum + c.width, 0) + gap * (row.length - 1);
    let x = centerX - rowWidth / 2;
    row.forEach((chip) => {
      roundRect(ctx, x, y, chip.width, chipHeight, chipHeight / 2);
      ctx.fillStyle = "#1c1c21";
      ctx.fill();
      ctx.fillStyle = "#e4e4e6";
      ctx.fillText(chip.name, x + chip.width / 2, y + chipHeight / 2);
      x += chip.width + gap;
    });
    y += chipHeight + gap;
  });
};
