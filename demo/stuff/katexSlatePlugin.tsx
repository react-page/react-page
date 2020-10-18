import React from 'react';
import { pluginFactories } from '@react-page/plugins-slate';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default pluginFactories.createComponentPlugin({
  Component: (props) => {
    const focused = props.useFocused();
    const selected = props.useSelected();

    const showSource = focused && selected;
    const math = props.getTextContents().join('\n').trim();
    return (
      <span style={!showSource ? { position: 'relative' } : {}}>
        {math ? (
          <span
            contentEditable={false}
            style={
              showSource
                ? {
                    position: 'absolute',
                    transform: 'translateY(-100%)',
                    transition: '0.2s',
                    backgroundColor: 'white',
                    border: '1px solid',
                    padding: 12,
                    display: 'inline-block',
                    zIndex: 10,
                  }
                : {}
            }
          >
            <InlineMath math={math} />
          </span>
        ) : null}
        <span
          style={
            showSource
              ? {
                  border: '1px solid',
                  backgroundColor: 'white',
                  padding: 12,
                }
              : {
                  opacity: '0',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }
          }
        >
          {props.children}
        </span>
      </span>
    );
  },
  addHoverButton: true,
  addToolbarButton: true,
  type: 'Katex',
  object: 'inline',
  addExtraSpace: true,
  icon: <span>Σ</span>, // or add a fancy icon
  label: 'Katex',
});
