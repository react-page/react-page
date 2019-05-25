import { ImageLoaded, ImageUploaded } from '@react-page/ui/lib/ImageUpload';

export interface ImageApi {
  handleImageLoaded: (image: ImageLoaded) => void;
  handleImageUploaded: (image: ImageUploaded) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}