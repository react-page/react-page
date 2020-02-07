import { ContentPluginProps } from '@react-page/core';
import { SlatePluginDefinition } from './slatePluginDefinitions';
import { SlateState } from './state';
import { Translations } from './translations';

export type SlateProps = ContentPluginProps<SlateState> & {
  plugins: SlatePluginDefinition<unknown>[];
  defaultPluginType: string;
  translations?: Translations;
};
