import { lazyLoad } from '@react-page/editor';
import React from 'react';
import createComponentPlugin from '../../pluginFactories/createComponentPlugin';

const Icon = lazyLoad(() => import('@material-ui/icons/Code'));

const block = createComponentPlugin({
  type: 'CODE/CODE',
  object: 'block',
  icon: <Icon />,
  label: 'Code Block',
  addToolbarButton: true,
  addHoverButton: false,
  deserialize: {
    tagName: 'code',
  },

  Component: ({ children, attributes }) => {
    return (
      <code
        {...attributes}
        style={{
          display: 'block',
          overflow: 'scroll',
        }}
      >
        {children}
      </code>
    );
  },
});

const mark = createComponentPlugin({
  type: 'CODE/CODE',
  object: 'mark',
  icon: <Icon />,
  label: 'Code',
  addHoverButton: true,
  addToolbarButton: false,
  deserialize: {
    tagName: 'code',
  },

  Component: ({ children, attributes }) => {
    return (
      <code style={{ whiteSpace: 'pre-wrap' }} {...attributes}>
        {children}
      </code>
    );
  },
});

export default {
  mark,
  block,
};
