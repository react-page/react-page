import { lazyLoad } from '@react-page/core';
import debounce from 'lodash.debounce';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import withInline from '../slateEnhancer/withInline';
import withPaste from '../slateEnhancer/withPaste';
import { SlateProps } from '../types/component';
import { SlatePlugin } from '../types/SlatePlugin';
import { useOnKeyDown } from './hotkeyHooks';
import { useRenderElement, useRenderLeave } from './renderHooks';
const HoverButtons = lazyLoad(() => import('./HoverButtons'));
const Toolbar = lazyLoad(() => import('./Toolbar'));

const SlateEditable = React.memo(
  (props: {
    plugins: SlatePlugin[];
    defaultPluginType: string;
    readOnly: boolean;
  }) => {
    const { plugins, defaultPluginType, readOnly } = props;
    const renderElement = useRenderElement({ plugins, defaultPluginType }, []);
    const renderLeaf = useRenderLeave({ plugins }, []);
    const onKeyDown = readOnly ? undefined : useOnKeyDown({ plugins }, []);

    return (
      <Editable
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    );
  }
);

const SlateControls = (props: SlateProps) => {
  const { state, plugins, focused, readOnly, remove, id } = props;
  const editor = useMemo(
    () => withPaste(plugins)(withReact(withInline(plugins)(createEditor()))),
    []
  );
  // useWhyDidYouUpdate('SlateControls' + id, props);
  const onChangeDebounced = useMemo(() => debounce(props.onChange, 200), [
    props.onChange,
  ]);
  const [value, setValue] = useState<Node[]>(state?.slate);

  useLayoutEffect(() => {
    if (state.selection) {
      // update seleciton, if changed from outside (e.g. through undo)
      Transforms.select(editor, state.selection);
    }
    setValue(state?.slate);
  }, [props.state?.slate]);

  const onChange = useCallback(
    v => {
      setValue(v);
      onChangeDebounced({
        slate: v,
        selection: editor.selection,
      });
    },
    [onChangeDebounced]
  );

  const showBottomToolbar = Boolean(focused);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {!readOnly && focused && (
        <HoverButtons
          plugins={props.plugins}
          translations={props.translations}
        />
      )}

      <SlateEditable
        readOnly={readOnly}
        plugins={plugins}
        defaultPluginType={props.defaultPluginType}
      />
      {!readOnly ? (
        <Toolbar
          plugins={plugins}
          show={showBottomToolbar}
          removeSlate={remove}
          id={id}
          name={props.name}
          translations={props.translations}
          editable={props.editable}
        />
      ) : null}
    </Slate>
  );
};

export default React.memo(SlateControls);
