import Plugin from '../plugins/Plugin';

import { Translations } from './translations';

export interface SlateSettings {
  plugins?: Plugin[];

  translations?: Translations;
}
