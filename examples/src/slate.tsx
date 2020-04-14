import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import React from 'react';
import customSlatePlugin from './customSlatePlugin';
import katexSlatePlugin from './katexSlatePlugin';

export const defaultSlate = slate(def => ({
  ...def,
  plugins: {
    ...def.plugins,
    custom: {
      custom1: customSlatePlugin,
      katex: katexSlatePlugin,
    },
  },
}));

// if you want to use a plugin twice with a differnet config, you have to give it another name
export const reducedSlate = slate(def => ({
  ...def,
  name: def.name + '/reduced', // give it some other name
  hideInMenu: true, // don't show in insert menu, we only use it as intial children
  plugins: {
    headings: {
      h2: def.plugins.headings.h2,
      // you can also customize default slate plugins easily
      h3: def.plugins.headings.h3(dh3 => {
        const OriginalH3 = dh3.Component;
        return {
          ...dh3,
          Component: props => <OriginalH3 {...props} style={{ color: 'red' }} />,
        };
      }),
    },
    paragraphs: def.plugins.paragraphs,
    emphasize: def.plugins.emphasize,
    alignment: def.plugins.alignment,
  },
}));
