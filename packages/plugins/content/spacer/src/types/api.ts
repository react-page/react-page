export interface SpacerApi {
  changeHeightPreview: (height: number) => void;
  commitHeight: (height?: number) => void;
}
