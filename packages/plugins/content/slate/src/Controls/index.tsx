import { lazyLoad } from '@react-page/core';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    placeholder: string;
  }) => {
    const { plugins, defaultPluginType, readOnly, placeholder } = props;
    const renderElement = useRenderElement({ plugins, defaultPluginType }, []);
    const renderLeaf = useRenderLeave({ plugins }, []);
    const onKeyDown = readOnly ? undefined : useOnKeyDown({ plugins }, []);

    return (
      <Editable
        placeholder={readOnly ? undefined : placeholder}
        readOnly={readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    );
  }
);

const SlateControls = (props: SlateProps) => {
  const {
    state,
    plugins,
    focused,
    readOnly,
    remove,
    id,
    defaultPluginType,
  } = props;
  const editor = useMemo(
    () =>
      withPaste(
        plugins,
        defaultPluginType
      )(withReact(withInline(plugins)(createEditor()))),
    []
  );
  // useWhyDidYouUpdate('SlateControls' + id, props);
  const onChangeDebounced = useMemo(() => debounce(props.onChange, 200), [
    props.onChange,
  ]);
  const [value, setValue] = useState<Node[]>(state?.slate);

  useEffect(() => {
    if (state.selection) {
      // update seleciton, if changed from outside (e.g. through undo)
      Transforms.select(editor, state.selection);
    } else {
      // deselect, otherwise slate might throw an eerror if cursor is now on a non existing dom node
      Transforms.deselect(editor);
    }
    setValue(state?.slate);
  }, [state?.slate, state?.selection]);

  const onChange = useCallback(
    (v) => {
      if (editor.selection) {
        setValue(v);
        onChangeDebounced({
          slate: v,
          selection: editor.selection,
        });
      }
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
        placeholder={props.translations.placeholder}
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
