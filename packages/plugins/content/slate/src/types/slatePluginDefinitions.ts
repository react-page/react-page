import { JsonSchema } from '@react-page/create-plugin-materialui';
import { ReactEditor } from 'slate-react';
import { NextType } from '../types/next';
import { Translations } from './translations';
import { Node } from 'slate';

export interface PluginButtonProps {
  translations?: Partial<Translations>;
}

export type SlatePluginControls<T extends {}> = {
  open: boolean;
  close: () => void;
  isActive: boolean;

  cancelLabel?: string;
  submitLabel?: string;
  removeLabel?: string;
  schema?: JsonSchema<T>;
  data: T;
  add: (p: { data?: T; text?: string }) => void;

  remove: () => void;
  shouldInsertWithText: boolean;
  getInitialData?: () => T;
} & PluginButtonProps;

export type SlateBasePluginDefinition<T extends {}> = {
  hotKey?: string;
  onKeyDown?: (
    e: React.KeyboardEvent,
    editor: ReactEditor,
    next: NextType
  ) => void;
  schema?: JsonSchema<T>;
  Controls?: React.ComponentType<SlatePluginControls<T>>;
  icon?: JSX.Element;
  label?: string;
  addHoverButton: boolean;
  addToolbarButton: boolean;
  customAdd?: (editor: ReactEditor) => void;
  customRemove?: (editor: ReactEditor) => void;
  isDisabled?: (editor: ReactEditor) => boolean;
  getInitialData?: () => T;
};

export type SlateNodeBasePluginDefinition<T extends {}> = {
  object: SlateNodeObjectType;
} & SlateBasePluginDefinition<T>;
export type SlateNodeObjectType = 'inline' | 'block' | 'mark';

export type SlateDataPluginDefinition<
  T extends {}
> = SlateNodeBasePluginDefinition<T> & {
  dataMatches: (data: T) => boolean;
};

export type SlateCustomPluginDefinition<
  T extends {}
> = SlateBasePluginDefinition<T> & {};

export type MapLike<T extends {}> = {
  get<K extends keyof T>(key: K): T[K];
};

type ObjectProps = {
  object: 'block';
  replaceWithDefaultOnRemove?: boolean;
};

type InlineProps = {
  object: 'inline';
  addExtraSpace?: boolean;
};

type MarkProps = {
  object: 'mark';
};

export type SlateComponentPluginDefinition<
  T extends {}
> = SlateNodeBasePluginDefinition<T> & {
  type: string;

  deserialize?: {
    tagName: string;
    getData?: (el: HTMLElement) => T;
  };
  Component: React.ComponentType<
    {
      attributes?: object;
      style?: object;
      className?: string;
      childNodes: Node[];
      getTextContents: () => string[];
      useFocused: () => boolean;
      useSelected: () => boolean;
    } & T
  >;
} & (ObjectProps | InlineProps | MarkProps);

// tslint:disable-next-line:no-any
export type SlatePluginDefinition<T extends { [key: string]: any }> =
  | (SlateComponentPluginDefinition<T> & { pluginType: 'component' })
  | (SlateDataPluginDefinition<T> & { pluginType: 'data' })
  | (SlateCustomPluginDefinition<T> & { pluginType: 'custom' });
