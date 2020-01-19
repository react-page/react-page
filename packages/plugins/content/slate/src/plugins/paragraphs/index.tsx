import React from 'react';
import createComponentPlugin from '../../pluginFactories/createComponentPlugin';

type Align = 'left' | 'right' | 'center' | 'justify';
export const getAlignmentFromElement = (el: HTMLElement) => {
  const align = el?.style?.textAlign as Align;
  if (align) {
    return {
      align,
    };
  }
};
export default {
  paragraph: createComponentPlugin<{
    align: Align;
  }>({
    type: 'PARAGRAPH/PARAGRAPH',
    object: 'block',
    addToolbarButton: false,
    addHoverButton: false,
    deserialize: {
      tagName: 'p',
      getData: getAlignmentFromElement,
    },

    Component: ({ children, align }) => {
      return <p style={{ textAlign: align }}>{children}</p>;
    },
  }),
};
