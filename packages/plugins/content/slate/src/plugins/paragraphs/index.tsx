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
    getStyle: ({ align }) => ({ textAlign: align }),

    Component: 'p',
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
    getStyle: ({ align }) => ({ textAlign: align }),

    Component: 'pre',
  }),
};
