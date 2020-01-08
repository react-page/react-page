import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { SerializationFunctions } from '../serialization';
import { SlatePluginDefinition } from './slatePluginDefinitions';
import { SlateState } from './state';
import { Translations } from './translations';

export type SlateProps = ContentPluginProps<SlateState> & {
  plugins: SlatePluginDefinition<unknown>[];

  translations?: Translations;
} & {
  serializeFunctions: SerializationFunctions;
};
