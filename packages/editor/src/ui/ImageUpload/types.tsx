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

export type ImageUploadProps = {
  imageLoaded?: (image: ImageLoaded) => void;
  imageUpload: ImageUploadType;
  imageUploadError?: (errorCode: number) => void;
  imageUploaded: (resp: ImageUploaded) => void;
  icon?: JSX.Element;
  style?: React.CSSProperties;
  maxFileSize?: number;
  allowedExtensions?: string[];
  translations?: { [key: string]: string };
};

export type ImageUploadState = {
  isUploading: boolean;
  hasError: boolean;
  errorText: string | null;
  progress?: number;
};
