import { RootState } from '../types/state';

export const getLang = ({ reactPage: { settings } }: RootState) =>
  settings.lang;
