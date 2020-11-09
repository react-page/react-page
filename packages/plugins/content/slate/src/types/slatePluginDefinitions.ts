/* eslint-disable @typescript-eslint/ban-types */

import { ReactEditor } from 'slate-react';

import { Translations } from './translations';
import { Node } from 'slate';
import { JsonSchema } from '@react-page/editor';

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
  onKeyDown?: (e: React.KeyboardEvent, editor: ReactEditor, next: any) => void;
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
  /**
   * if defined these properties will be removed from data when plugin gets disabled
   */
  properties?: Array<keyof T>;
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
type NoInfer<T> = [T][T extends any ? 0 : never];

export type SlateComponentPluginDefinition<
  T extends {}
> = SlateNodeBasePluginDefinition<T> & {
  type: string;
  getStyle?: (s: T) => React.CSSProperties;
  deserialize?: {
    tagName: string;
    getData?: (el: HTMLElement) => T;
  };
  Component:
    | keyof JSX.IntrinsicElements
    | React.ComponentType<
        NoInfer<
          {
            attributes?: object;
            style?: React.CSSProperties;
            className?: string;
            childNodes: Node[];
            getTextContents: () => string[];
            useFocused: () => boolean;
            useSelected: () => boolean;
          } & T
        >
      >;
} & (ObjectProps | InlineProps | MarkProps);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SlatePluginDefinition<T extends { [key: string]: any }> =
  | (SlateComponentPluginDefinition<T> & { pluginType: 'component' })
  | (SlateDataPluginDefinition<T> & { pluginType: 'data' })
  | (SlateCustomPluginDefinition<T> & { pluginType: 'custom' });
