import Plugin from './SlatePlugin';

import { Translations } from './translations';

export interface SlateSettings {
  plugins?: Plugin[];

  translations?: Translations;
}
