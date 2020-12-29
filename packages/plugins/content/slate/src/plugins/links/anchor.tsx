import React from 'react';
import createDataPlugin from '../../pluginFactories/createDataPlugin';

const anchor = createDataPlugin<{ id: string }>({
  addHoverButton: false,
  addToolbarButton: true,
  object: 'block',
  label: 'Id for Link Anchor',
  icon: <span>#</span>,
  properties: ['id'],
  dataMatches: (data) => {
    return Boolean(data?.id);
  },
  controls: {
    type: 'autoform',
    schema: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'string',
        },
      },
    },
  },
});

export default anchor;
