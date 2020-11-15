import { pluginFactories } from '@react-page/plugins-slate';
import React from 'react';

export default pluginFactories.createComponentPlugin<{
  color: string;
}>({
  addHoverButton: true,
  addToolbarButton: true,
  type: 'SetColor',
  object: 'mark',
  icon: <span>Color</span>,
  label: 'Set Color',
  Component: 'span',
  getStyle: ({ color }) => ({ color }),

  schema: {
    type: 'object',
    required: ['color'],
    properties: {
      color: {
        default: 'blue',
        type: 'string',
        enum: ['red', 'blue', 'green', 'orange'],
      },
    },
  },
});
