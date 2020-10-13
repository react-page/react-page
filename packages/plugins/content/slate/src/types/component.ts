import { CellPluginComponentProps } from '@react-page/core';
import { SlatePluginDefinition } from './slatePluginDefinitions';
import { SlateState } from './state';
import { Translations } from './translations';

export type SlateProps = CellPluginComponentProps<SlateState> & {
  plugins: SlatePluginDefinition<unknown>[];
  defaultPluginType: string;
  translations?: Translations;
};
