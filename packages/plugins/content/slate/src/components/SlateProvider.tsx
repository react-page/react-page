import debounce from 'lodash.debounce';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, withReact } from 'slate-react';
import withInline from '../slateEnhancer/withInline';
import withPaste from '../slateEnhancer/withPaste';
import { SlateProps } from '../types/component';

const SlateProvider: React.FC<SlateProps> = (props) => {
  const { data, plugins, children, defaultPluginType } = props;
  const [value, setValue] = useState<Node[]>(data?.slate);
  const valueRef = useRef(value);
  valueRef.current = value;
  const editor = useMemo(
    () =>
      withPaste(
        plugins,
        defaultPluginType
      )(withReact(withInline(plugins)(createEditor()))),
    []
  );
  const onChangeDebounced = useCallback(
    debounce(() => {
      props.onChange(
        {
          slate: valueRef.current,
          selection: editor.selection,
        },
        {
          // mark as not undoable when state is same
          // that happens if only selection was changed
          notUndoable: valueRef.current === data.slate,
        }
      );
    }, 200),
    [props.onChange, editor]
  );

  useEffect(() => {
    if (data.selection) {
      // update seleciton, if changed from outside (e.g. through undo)
      Transforms.select(editor, data.selection);
    } else {
      // deselect, otherwise slate might throw an eerror if cursor is now on a non existing dom node
      Transforms.deselect(editor);
    }
    setValue(data?.slate);
  }, [data?.slate, data?.selection]);

  const onChange = useCallback(
    (v) => {
      if (editor.selection) {
        setValue(v);
        onChangeDebounced();
      }
    },
    [onChangeDebounced]
  );

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {children}
    </Slate>
  );
};

export default SlateProvider;
