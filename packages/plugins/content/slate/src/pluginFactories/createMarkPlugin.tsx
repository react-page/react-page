import createComponentPlugin from './createComponentPlugin';
import React from 'react';

type MarkPluginDefinition = {
  type: string;
  tagName: keyof JSX.IntrinsicElements;
  icon?: JSX.Element;
  hotKey?: string;
};

export default (markDef: MarkPluginDefinition) => {
  return createComponentPlugin({
    type: markDef.type,
    object: 'mark',
    hotKey: markDef.hotKey,
    icon: markDef.icon,
    addToolbarButton: false,
    addHoverButton: true,
    deserialize: {
      tagName: markDef.tagName,
    },
    Component: ({ children, attributes }) => {
      const Tag = (markDef.tagName as unknown) as React.ComponentType;
      return <Tag {...attributes}>{children}</Tag>;
    },
  });
};
