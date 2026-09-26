import { aboutIntro } from "../constants";
import { drawScreenContent } from "../lib/screenTexture";
import { useCanvasTexture } from "./useCanvasTexture";

// Canvas texture showing a preview of the section below the hero.
// Size it to the aspect ratio of the screen it is shown on.
export const useScreenTexture = (width: number, height: number) =>
  useCanvasTexture(width, height, drawScreenContent, aboutIntro);
