import { PluginProps } from '@react-page/core';
import { SlatePluginDefinition } from './slatePluginDefinitions';
import { SlateState } from './state';
import { Translations } from './translations';

export type SlateProps = PluginProps<SlateState> & {
  plugins: SlatePluginDefinition<unknown>[];
  defaultPluginType: string;
  translations?: Translations;
};
