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
    label: 'Paragraph',
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
  // currently only for deserialize
  pre: createComponentPlugin<{
    align: Align;
  }>({
    type: 'PARAGRAPH/PRE',
    label: 'Pre',
    object: 'block',
    addToolbarButton: false,
    addHoverButton: false,
    deserialize: {
      tagName: 'pre',
      getData: getAlignmentFromElement,
    },

    Component: ({ children, align }) => {
      return <pre style={{ textAlign: align }}>{children}</pre>;
    },
  }),
};
