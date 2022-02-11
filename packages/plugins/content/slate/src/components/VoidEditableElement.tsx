import React, { useCallback, useState } from 'react';

import type { Element } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import type { SlatePluginDefinition } from '../types/slatePluginDefinitions';
import PluginControls from './PluginControls';

import { useSelected } from 'slate-react';

const VoidEditableElement: React.FC<{
  plugin: SlatePluginDefinition<unknown>;
  element: Element;
  component: React.ReactNode;
}> = ({ plugin, element, children, component }) => {
  const [showVoidDialog, setShowVoidDialog] = useState(false);
  const editor = useSlateStatic();
  const onVoidClick = useCallback(
    (e) => {
      e.stopPropagation();
      const path = ReactEditor.findPath(editor, element);

      setShowVoidDialog(true);
      Transforms.select(editor, path);
    },
    [editor, element]
  );
  const closeVoidDialog = useCallback(() => setShowVoidDialog(false), []);
  const Element = plugin.object === 'inline' ? 'span' : 'div';
  const selected = useSelected();
  return (
    <>
      {showVoidDialog ? (
        <PluginControls
          open={showVoidDialog}
          close={closeVoidDialog}
          plugin={plugin}
          // TODO: translations
        />
      ) : null}

      <Element
        onClick={onVoidClick}
        style={{
          cursor: 'pointer',
          outline: selected ? '1px dotted grey' : undefined,
        }}
      >
        <Element style={{ pointerEvents: 'none' }}>
          {children}
          {component}
        </Element>
      </Element>
    </>
  );
};

export default VoidEditableElement;
