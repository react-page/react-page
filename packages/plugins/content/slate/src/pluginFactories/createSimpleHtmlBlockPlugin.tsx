import React from 'react';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';
import createComponentPlugin from './createComponentPlugin';

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
  | 'schema'
> & {
  replaceWithDefaultOnRemove?: boolean;
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
    replaceWithDefaultOnRemove: def.replaceWithDefaultOnRemove,
    icon: def.icon,
    onKeyDown: def.onKeyDown,
    addToolbarButton: !def.noButton,
    customAdd: def.customAdd,
    customRemove: def.customRemove,
    schema: def.schema,
    addHoverButton: false,
    deserialize: {
      tagName: def.tagName,
    },
    Component: ({ children, attributes, style, className, align }) => {
      const Tag = (def.tagName as unknown) as React.ComponentType<{
        style: object;
        className?: string;
      }>;
      return (
        <Tag
          {...attributes}
          className={className}
          style={{ textAlign: align, ...style }}
        >
          {children}
        </Tag>
      );
    },
  });
}

export default createSimpleHtmlBlockPlugin;
