import createComponentPlugin from './createComponentPlugin';

import React from 'react';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

type Def<T extends {}> = Pick<
  SlateComponentPluginDefinition<HtmlBlockData<T>>,
  | 'type'
  | 'icon'
  | 'customAdd'
  | 'customRemove'
  | 'isDisabled'
  | 'hotKey'
  | 'onKeyDown'
  | 'getInitialData'
> & {
  replaceOnRemove?: string;
  tagName: string;
  noButton?: boolean;
};

export type DefaultBlockDataType = {
  align: 'left' | 'right' | 'center' | 'justify';
};

export type HtmlBlockData<T> = T & DefaultBlockDataType;

function createSimpleHtmlBlockPlugin<T = {}>(def: Def<HtmlBlockData<T>>) {
  return createComponentPlugin<HtmlBlockData<T>>({
    type: def.type,
    object: 'block',
    hotKey: def.hotKey,
    replaceOnRemove: def.replaceOnRemove,
    icon: def.icon,
    onKeyDown: def.onKeyDown,
    addToolbarButton: !def.noButton,
    customAdd: def.customAdd,
    customRemove: def.customRemove,
    addHoverButton: false,
    deserialize: {
      tagName: def.tagName,
    },
    Component: ({ data, children, attributes }) => {
      const Tag = (def.tagName as unknown) as React.ComponentType<{
        style: object;
      }>;
      return (
        <Tag {...attributes} style={{ textAlign: data.get('align') }}>
          {children}
        </Tag>
      );
    },
  });
}

export default createSimpleHtmlBlockPlugin;
