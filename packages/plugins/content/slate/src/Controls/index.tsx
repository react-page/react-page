import { lazyLoad } from '@react-page/core';
import { BottomToolbar } from '@react-page/ui';
import isHotkey from 'is-hotkey';
/*
import isHotkey from 'is-hotkey';
import debounce from 'lodash.debounce';
import * as React from 'react';
import { Portal } from 'react-portal';

import { Slate, Editable, withReact } from 'slate-react'

import { NextType } from '../types/next';
import SlatePlugin from '../types/SlatePlugin';

interface Cancelable {
  cancel(): void;
  flush(): void;
}

export interface SlateState {
  editorState?: Value;
}

class Slate extends React.PureComponent<SlateProps, SlateState> {
  private toolbar: React.RefObject<HTMLDivElement>;
  private editor: React.RefObject<CoreEditor>;
  private flushStateDebounced: (() => void) & Cancelable;

  constructor(props: SlateProps) {
    super(props);
    this.state = {};
    this.editor = React.createRef();
    this.toolbar = React.createRef();
    this.flushStateDebounced = debounce(this.flushState, 1000, {
      leading: true,
      trailing: true,
      maxWait: 10000,
    });
  }

  componentDidMount = () => {
    this.updateToolbar();
  }

  flushState = () => {
    if (this.state.editorState) {
      this.props.onChange({ editorState: this.state.editorState });
    }
  }

  getState() {
    return this.state.editorState !== undefined
      ? this.state.editorState
      : this.props.state.editorState;
  }

  onStateChange = ({ value }: { value: Value }) => {
    this.setState(
      {
        editorState: value,
      },
      () => {
        this.updateToolbar();
      }
    );
    this.flushStateDebounced();
  }

  updateToolbar = () => {
    const editorState = this.getState();
    const toolbar = this.toolbar.current;

    if (
      !toolbar ||
      editorState.selection.isBlurred ||
      editorState.selection.isCollapsed
    ) {
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
  }

  /*
  onPaste = (e: React.ClipboardEvent, editor: CoreEditor, next: NextType) => {
    const transfer = getEventTransfer(e);
    if (transfer.type !== 'html') {
      return next();
    }

    const { document } = this.props.serializeFunctions.htmlToSlate(
      // tslint:disable-next-line:no-any
      (transfer as any).html
    );

    return editor.insertFragment(document);
  }
  */
/*
  onKeyDown = (
    e: React.KeyboardEvent,
    editor: CoreEditor,
    next: NextType
  ): boolean => {
    // we need to prevent slate from handling undo and redo
    if (isHotkey(['mod+z', 'mod+y'], e.nativeEvent)) {
      this.setState({ editorState: undefined });
      return true;
    }

    if (isHotkey('shift+enter', e.nativeEvent)) {
      e.preventDefault();
      editor.insertText('\n');
      return true;
    }

    return next();
  }
  
  render() {
    
  }
}
*/
import React, { DependencyList, useCallback, useMemo, useState } from 'react';
import { Portal } from 'react-portal';
import { createEditor, Editor, Node, Range } from 'slate';
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
  { plugins }: { plugins: SlatePlugin[] },
  deps: DependencyList
) => {
  const componentPlugins = useComponentNodePlugins({ plugins }, deps);
  return useCallback(
    ({
      element: { type, ...elementProps },
      children,
      attributes,
    }: RenderElementProps) => {
      const matchingPlugin = componentPlugins.find(
        plugin => plugin.type === type
      );

      if (matchingPlugin) {
        const { Component } = matchingPlugin;

        return (
          <Component
            {...elementProps}
            attributes={attributes}
            children={children}
          />
        );
      }
      return <p>default - implement me</p>;
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
              return <Component>{el}</Component>;
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
        if (isHotkey(plugin.hotKey, (event as unknown) as KeyboardEvent)) {
          event.preventDefault();
          const node = getCurrentNodeWithPlugin(editor, plugin);
          if (node) {
            removePlugin(editor, plugin);
          } else {
            addPlugin(editor, plugin);
          }
        }
      });

    /*
    if (isHotkey('shift+enter', (event as unknown) as KeyboardEvent)) {
      event.preventDefault();
      editor.exec({
        type: 'insert_text',
        text: '\n',
      });
    }
    */
  }, deps);
};

const SlateEditable = ({
  plugins,
  editor,
}: {
  plugins: SlatePlugin[];
  editor: Editor;
}) => {
  const renderElement = useRenderElement({ plugins }, []);
  const renderLeaf = useRenderLeave({ plugins }, []);
  const onKeyDown = useOnKeyDown({ plugins }, []);

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={onKeyDown}
    />
  );
};
const SlateControls = (props: SlateProps) => {
  const { plugins, focused, readOnly, remove, translations } = props;
  const editor = useMemo(() => withReact(createEditor()), []);

  // TODO: wrap with useEffect
  const showHoverToolbar =
    !editor.selection ||
    !ReactEditor.isFocused(editor) ||
    Range.isCollapsed(editor.selection) ||
    Editor.string(editor, editor.selection) === '';
  const [value, setValue] = useState<Node[]>([
    {
      type: 'PARAGRAPH/PARAGRAPH',
      children: [
        {
          text: 'fudi',
        },
        {
          text: 'gaggi',
          'EMPHASIZE/EM': true,
        },
      ],
    },
  ]);
  const showBottomToolbar = Boolean(focused);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      {!readOnly && focused && (
        <Portal>
          <div
            className={
              'ory-plugins-content-slate-inline-toolbar ' +
              (showHoverToolbar
                ? ''
                : 'ory-plugins-content-slate-inline-toolbar--hidden')
            }
            style={{ padding: 0 }}
            // ref={this.toolbar}
          >
            <HoverButtons
              translations={translations}
              editor={editor}
              {...props}
            />
          </div>
        </Portal>
      )}

      <SlateEditable editor={editor} plugins={plugins} />

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

export default SlateControls;
