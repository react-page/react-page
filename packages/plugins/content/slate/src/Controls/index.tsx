import { lazyLoad } from '@react-page/core';
import isHotkey from 'is-hotkey';
import debounce from 'lodash.debounce';
import isObject from 'lodash.isobject';
import React, {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { createEditor, Node } from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact
} from 'slate-react';
import { addPlugin } from '../hooks/useAddPlugin';
import { getCurrentNodeWithPlugin } from '../hooks/useCurrentNodeWithPlugin';
import { removePlugin } from '../hooks/useRemovePlugin';
import withInline from '../slateEnhancer/withInline';
import withPaste from '../slateEnhancer/withPaste';
import { SlateProps } from '../types/component';
import { SlatePlugin } from '../types/SlatePlugin';
import { SlateComponentPluginDefinition } from '../types/slatePluginDefinitions';

const HoverButtons = lazyLoad(() => import('./HoverButtons'));
const Toolbar = lazyLoad(() => import('./Toolbar'));

const useComponentNodePlugins = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) =>
  useMemo(
    () =>
      plugins.filter(
        plugin => plugin.pluginType === 'component' && plugin.object !== 'mark'
        // tslint:disable-next-line:no-any
      ) as SlateComponentPluginDefinition<any>[],
    deps
  );

const useComponentMarkPlugins = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) =>
  useMemo(
    () =>
      plugins.filter(
        plugin => plugin.pluginType === 'component' && plugin.object === 'mark'
        // tslint:disable-next-line:no-any
      ) as SlateComponentPluginDefinition<any>[],
    deps
  );
// tslint:disable-next-line:no-any

const useRenderElement = (
  {
    plugins,
    defaultPluginType,
  }: { plugins: SlatePlugin[]; defaultPluginType: string },
  deps: DependencyList
) => {
  const componentPlugins = useComponentNodePlugins({ plugins }, deps);
  return useCallback(
    ({
      element: { type, ...elementProps },
      children,
      attributes,
    }: RenderElementProps) => {
      const matchingPlugin =
        componentPlugins.find(plugin => plugin.type === type) ??
        componentPlugins.find(plugin => plugin.type === defaultPluginType);

      if (matchingPlugin) {
        const { Component } = matchingPlugin;
        Component.displayName = 'SlatePlugin(' + matchingPlugin.type + ')';
        return (
          <Component
            {...elementProps}
            attributes={attributes}
            children={children}
          />
        );
      }
      return <p>unknown component {type}</p>;
    },
    deps
  );
};

const useRenderLeave = (
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) => {
  const markPlugins = useComponentMarkPlugins({ plugins }, deps);

  return useCallback(
    ({
      leaf: { text, ...leaveTypes },
      attributes,
      children,
    }: RenderLeafProps) => {
      return (
        <span {...attributes}>
          {Object.keys(leaveTypes).reduce((el, type) => {
            const matchingPlugin = markPlugins.find(
              plugin => plugin.type === type
            );
            if (matchingPlugin) {
              const { Component } = matchingPlugin;
              const value = leaveTypes[type]; // usually boolean
              const props = isObject(value) ? value : {};
              return <Component {...props}>{el}</Component>;
            }
            return el;
          }, children)}
        </span>
      );
    },
    deps
  );
};

const useOnKeyDown = (
  {
    plugins,
  }: {
    plugins: SlatePlugin[];
  },
  deps: DependencyList
) => {
  const editor = useSlate();

  return React.useCallback(event => {
    plugins
      .filter(plugin => plugin.hotKey)
      .forEach(plugin => {
        if (isHotkey(plugin.hotKey, event)) {
          event.preventDefault();
          const node = getCurrentNodeWithPlugin(editor, plugin);
          if (node) {
            removePlugin(editor, plugin);
          } else {
            addPlugin(editor, plugin);
          }
        }
      });

    // we need to prevent slate from handling undo and redo
    if (isHotkey(['mod+z', 'mod+y'], event)) {
      event.preventDefault();
      return true;
    }

    if (isHotkey('shift+enter', event)) {
      event.preventDefault();
      editor.insertText('\n');
      return true;
    }
  }, deps);
};

const SlateEditable = React.memo(
  ({
    plugins,
    defaultPluginType,
    readOnly,
  }: {
    plugins: SlatePlugin[];
    defaultPluginType: string;
    readOnly: boolean;
  }) => {
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
  const { plugins, focused, readOnly, remove } = props;
  const editor = useMemo(
    () => withPaste(plugins)(withReact(withInline(plugins)(createEditor()))),
    []
  );

  const onChangeDebounced = useMemo(() => debounce(props.onChange, 600), [
    props.onChange,
  ]);
  const [value, setValue] = useState<Node[]>(props.state?.slate);
  useEffect(() => {
    setValue(props.state?.slate);
  }, [props.state?.slate]);

  const onChange = useCallback(
    v => {
      setValue(v);
      onChangeDebounced({
        slate: v,
      });
    },
    [onChangeDebounced]
  );

  const showBottomToolbar = Boolean(focused);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {!readOnly && focused && <HoverButtons {...props} />}

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
          {...props}
        />
      ) : null}
    </Slate>
  );
};

export default React.memo(SlateControls);
