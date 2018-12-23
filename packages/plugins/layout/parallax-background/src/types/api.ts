export interface ParallaxBackgroundApi {
  handleDarkenPreviewChange: (darken: number | string) => void;
  commitDarken: () => void;
  handleBackgroundPreviewChange: (background: string) => void;
  commitBackground: () => void;
}