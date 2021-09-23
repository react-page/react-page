import React from 'react';
import createComponentPlugin from './createComponentPlugin';

type MarkPluginDefinition = {
  type: string;
  tagName: keyof JSX.IntrinsicElements;
  icon?: JSX.Element;
  hotKey?: string;
  label?: string;
};

export default (markDef: MarkPluginDefinition) => {
  return createComponentPlugin({
    type: markDef.type,
    object: 'mark',
    hotKey: markDef.hotKey,
    icon: markDef.icon,
    label: markDef.label,
    addToolbarButton: false,
    addHoverButton: true,
    deserialize: {
      tagName: markDef.tagName,
    },
    Component: ({ children, attributes }) => {
      const Tag = markDef.tagName as unknown as React.ComponentType;
      return <Tag {...attributes}>{children}</Tag>;
    },
  });
};
