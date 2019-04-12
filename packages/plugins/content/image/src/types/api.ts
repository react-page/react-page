import { ImageLoaded, ImageUploaded } from 'ory-editor-ui/lib/ImageUpload';

export interface ImageApi {
  handleImageLoaded: (image: ImageLoaded) => void;
  handleImageUploaded: (image: ImageUploaded) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBorderRadius: (event: React.ChangeEvent<{}>, value: number) => void;
  handleChangeWidth: (event: React.ChangeEvent<{}>, value: number) => void;
}
