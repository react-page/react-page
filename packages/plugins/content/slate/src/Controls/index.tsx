import { lazyLoad } from '@react-page/core';
import { BottomToolbar } from '@react-page/ui';
import isHotkey from 'is-hotkey';
import debounce from 'lodash.debounce';
import isObject from 'lodash.isobject';
import React, {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Portal } from 'react-portal';
import { createEditor, Editor, Node, Transforms } from 'slate';
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact
} from 'slate-react';
import { SlatePlugin } from 'src/types/SlatePlugin';
import { addPlugin } from '../hooks/useAddPlugin';
import { getCurrentNodeWithPlugin } from '../hooks/useCurrentNodeWithPlugin';
import { removePlugin } from '../hooks/useRemovePlugin';
import HtmlToSlate from '../HtmlToSlate';
import { SlateProps } from '../types/component';
import {
  PluginButtonProps,
  SlateComponentPluginDefinition
} from '../types/slatePluginDefinitions';

const PluginButton = lazyLoad(
  () =>
    (import('./PluginButton') as unknown) as Promise<
      React.ComponentType<PluginButtonProps & { config: SlatePlugin }>
    >
);

const HoverButtons = ({
  editor,
  plugins,
  translations,
}: PluginButtonProps & SlateProps) => (
  <div>
    {plugins &&
      plugins.map((plugin, i: number) =>
        plugin.addHoverButton ? (
          <PluginButton
            translations={translations}
            key={i}
            config={plugin}
            editor={editor}
          />
        ) : null
      )}
  </div>
);

const HoverButtonsContainer = (props: SlateProps) => {
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
        <HoverButtons editor={editor} {...props} />
      </div>
    </Portal>
  );
};

const ToolbarButtons = ({
  plugins,

  editor,
  translations,
}: PluginButtonProps & SlateProps) => (
  <div>
    {plugins &&
      plugins.map((plugin, i: number) =>
        plugin.addToolbarButton ? (
          <PluginButton
            translations={translations}
            key={i}
            config={plugin}
            editor={editor}
          />
        ) : null
      )}
  </div>
);

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
  }: {
    plugins: SlatePlugin[];
    defaultPluginType: string;
  }) => {
    const renderElement = useRenderElement({ plugins, defaultPluginType }, []);
    const renderLeaf = useRenderLeave({ plugins }, []);
    const onKeyDown = useOnKeyDown({ plugins }, []);

    return (
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    );
  }
);

const useTextIsSelected = () => {
  const editor = useSlate();
  try {
    console.log(
      Boolean(editor.selection) && Editor.string(editor, editor.selection)
    );
    return (
      Boolean(editor.selection) &&
      Editor.string(editor, editor.selection) !== ''
    );
  } catch (e) {
    // can in some cases throw currently
    return false;
  }
};
const withInline = (plugins: SlatePlugin[]) => (editor: Editor) => {
  const { isInline } = editor;
  editor.isInline = element => {
    return plugins.some(
      plugin =>
        plugin.pluginType === 'component' &&
        plugin.object === 'inline' &&
        plugin.type === element.type
    )
      ? true
      : isInline(element);
  };
  return editor;
};

const withPaste = (plugins: SlatePlugin[]) => (editor: ReactEditor) => {
  const { insertData } = editor;
  const htmlToSlate = HtmlToSlate({ plugins });
  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const { slate } = htmlToSlate(html);

      Transforms.insertFragment(editor, slate);
      return;
    }

    insertData(data);
  };
  return editor;
};

const SlateControls = (props: SlateProps) => {
  const { plugins, focused, readOnly, remove, translations } = props;
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
      {!readOnly && focused && <HoverButtonsContainer {...props} />}

      <SlateEditable
        plugins={plugins}
        defaultPluginType={props.defaultPluginType}
      />

      {!readOnly ? (
        <BottomToolbar
          open={showBottomToolbar}
          dark={true}
          onDelete={remove}
          {...props}
        >
          <ToolbarButtons
            {...props}
            translations={translations}
            editor={editor.current}
          />
        </BottomToolbar>
      ) : null}
    </Slate>
  );
};

export default React.memo(SlateControls);
