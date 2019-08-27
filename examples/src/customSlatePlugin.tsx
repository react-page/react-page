import { pluginFactories } from '@react-page/plugins-slate';
import React from 'react';

export default pluginFactories.createComponentPlugin<{
  color: string;
}>({
  addHoverButton: false,
  addToolbarButton: true,
  type: 'SetColor',
  object: 'block',
  icon: <span>Color</span>,
  Component: props => {
    return (
      <div style={{ color: props.data.get('color') }}>{props.children}</div>
    );
  },
  schema: {
    type: 'object',
    required: ['color'],
    properties: {
      color: {
        type: 'string',
      },
    },
  },
});
