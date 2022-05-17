import { deepEquals } from '@react-page/editor';
import React, { useCallback, useEffect, useMemo } from 'react';
import { createEditor, Transforms } from 'slate';
import { ReactEditor, Slate, withReact } from 'slate-react';
import withInline from '../slateEnhancer/withInline';
import withPaste from '../slateEnhancer/withPaste';
import type { SlateProps } from '../types/component';
import DialogVisibleProvider from './DialogVisibleProvider';

const SlateProvider: React.FC<SlateProps> = (props) => {
  const { data, plugins, children, defaultPluginType } = props;
  const editor = useMemo(
    () =>
      withPaste(
        plugins,
        defaultPluginType
      )(withReact(withInline(plugins)(createEditor()))),
    []
  );

  useEffect(() => {
    // unfortunatly, slate broke the controlled input pattern. So we have to hack our way around it, see https://github.com/ianstormtaylor/slate/issues/4992
    editor.children = data?.slate;

    if (data.selection) {
      try {
        ReactEditor.focus(editor);
      } catch (e) {
        // ignore, can happen
      }
      // update seleciton, if changed from outside (e.g. through undo)
      Transforms.select(editor, data.selection);
    } else {
      // deselect, otherwise slate might throw an eerror if cursor is now on a non existing dom node
      Transforms.deselect(editor);
    }
  }, [data?.slate, data?.selection]);

  const onChange = useCallback(
    (v) => {
      if (
        !deepEquals(editor.children, data?.slate) ||
        !deepEquals(editor.selection, data?.selection)
      )
        props.onChange(
          {
            slate: editor.children,
            selection: editor.selection,
          },
          {
            // mark as not undoable when state is same
            // that happens if only selection was changed
            notUndoable: deepEquals(editor.children, data?.slate),
          }
        );
    },
    [data?.slate]
  );

  const initialValue = data?.slate;

  return (
    <DialogVisibleProvider>
      <Slate
        editor={editor}
        value={
          initialValue /*
      this is confusingly only for the initial value since slate 0.70something, see https://github.com/ianstormtaylor/slate/issues/4992
    */
        }
        onChange={onChange}
      >
        {children}
      </Slate>
    </DialogVisibleProvider>
  );
};

export default SlateProvider;
