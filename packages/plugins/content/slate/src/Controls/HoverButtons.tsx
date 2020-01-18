import React, { useEffect, useRef } from 'react';
import { Portal } from 'react-portal';
import { useSlate } from 'slate-react';
import useTextIsSelected from '../hooks/useTextIsSelected';
import { SlateProps } from '../types/component';
import PluginButton from './PluginButton';

const HoverButtons = ({
  plugins,
  translations,
}: Pick<SlateProps, 'plugins' | 'translations'>) => {
  const showHoverToolbar = useTextIsSelected();
  const toolbarRef = useRef<HTMLDivElement>();
  const editor = useSlate();
  useEffect(() => {
    const toolbar = toolbarRef.current;

    if (!showHoverToolbar) {
      return;
    }

    let s = window.getSelection();
    let oRange = s.getRangeAt(0); // get the text range
    let oRect = oRange.getBoundingClientRect();
    if (oRect) {
      const { left, top, width } = oRect;

      toolbar.style.opacity = '1';
      toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`;
      toolbar.style.left = `${left +
        window.scrollX -
        toolbar.offsetWidth / 2 +
        width / 2}px`;
    }
  }, [editor, showHoverToolbar]);

  return (
    <Portal>
      <div
        className={
          'ory-plugins-content-slate-inline-toolbar ' +
          (showHoverToolbar
            ? ''
            : 'ory-plugins-content-slate-inline-toolbar--hidden')
        }
        style={{ padding: 0 }}
        ref={toolbarRef}
      >
        {plugins &&
          plugins.map((plugin, i: number) =>
            plugin.addHoverButton ? (
              <PluginButton
                translations={translations}
                key={i}
                plugin={plugin}
              />
            ) : null
          )}
      </div>
    </Portal>
  );
};

export default HoverButtons;
