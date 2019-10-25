import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { SlateState } from './state';

import { SerializationFunctions } from '../serialization';
import { Translations } from './translations';
import SlatePlugin from './SlatePlugin';

export type SlateProps = ContentPluginProps<SlateState> & {
  plugins: SlatePlugin[];

  translations?: Translations;
} & {
  serializeFunctions: SerializationFunctions;
};
