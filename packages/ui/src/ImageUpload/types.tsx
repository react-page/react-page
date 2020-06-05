export type ImageLoaded = {
  file: File;
  dataUrl: string;
};

export type ImageUploaded = {
  url: string;
};
export type ImageUploadType = (
  file: File,
  reportProgress: (progress: number) => void
) => Promise<ImageUploaded>;
