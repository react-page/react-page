import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import React from 'react';
import customSlatePlugin from './customSlatePlugin';
import katexSlatePlugin from './katexSlatePlugin';
import styled from 'styled-components';
export const defaultSlate = slate((def) => ({
  ...def,
  plugins: {
    // this will pull in all predefined plugins
    ...def.plugins,
    // you can also add custom plugins. The namespace `custom` is just for organizing plugins
    custom: {
      custom1: customSlatePlugin,
      katex: katexSlatePlugin,
    },
  },
}));

// you can further customize slate to your needs
export const customizedSlate = slate((def) => ({
  ...def,
  name: def.name + '/reduced', // you have to give it some other name
  hideInMenu: true, // don't show in insert menu, we only use it as intial children
  plugins: {
    // here we do not use all plugins, but select them
    headings: {
      h2: def.plugins.headings.h2,

      // you can also customize default slate plugins easily!
      // e.g. change just the style:
      h3: def.plugins.headings.h3((d) => {
        return {
          ...d, // this is the default configuration of this plugin
          // we can override properties, like `getStyle`:
          getStyle: (props) => ({ ...d.getStyle?.(props), color: 'magenta' }),
        };
      }),
      //  we can also replace the component that renders the plugin
      h4: def.plugins.headings.h4((d) => {
        return {
          ...d,
          Component: (props) => {
            return (
              // be sure to mixin attributes, this is required for slate
              <h4 style={props.style} {...props.attributes}>
                {/* if you add custom html into slate, set  contentEditable={false}*/}
                <span contentEditable={false} role="img" aria-label="Ladybug">
                  🐞
                </span>
                {props.children}
                <span contentEditable={false} role="img" aria-label="Heart">
                  {' '}
                  ❤️
                </span>
              </h4>
            );
          },
        };
      }),
      h5: def.plugins.headings.h5((d) => {
        return {
          ...d,
          // if you use styled-components, you can use it as well
          Component: styled.h5`
            text-decoration: underline;
            font-style: italic;
          `,
        };
      }),
    },
    paragraphs: def.plugins.paragraphs,
    emphasize: def.plugins.emphasize,
    alignment: def.plugins.alignment,
  },
}));
