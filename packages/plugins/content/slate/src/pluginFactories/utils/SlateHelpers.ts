import { Inline, Mark, Editor, Block } from 'slate';
import {
  SlatePluginDefinition,
  MapLike
} from '../../types/slatePluginDefinitions';

export default class SlateHelpers<T> {
  editor: Editor;
  config: SlatePluginDefinition<T>;
  constructor(editor: Editor, config: SlatePluginDefinition<T>) {
    this.editor = editor;
    this.config = config;
  }

  getCurrentNode = () => {
    const { config, editor } = this;
    if (config.pluginType === 'custom') {
      // currently not implemented
      return null;
    }
    if (!editor) {
      return null;
    }
    const editorState = editor.value;

    const predicate =
      config.pluginType === 'component'
        ? (el: Inline | Mark | Block) => el.type === config.type
        : config.pluginType === 'data'
        ? // search for data
          (el: Inline | Mark | Block) => {
            const matches = config.dataMatches(el.data as MapLike<T>);

            return matches;
          }
        : null;

    if (config.object === 'inline') {
      return editorState.inlines.find(predicate);
    } else if (config.object === 'mark') {
      return editorState.marks.find(predicate);
    } else if (config.object === 'block') {
      if (config.pluginType === 'data' || config.replaceOnRemove) {
        return editorState.blocks.find(predicate);
      } else {
        const matchingBlocks = editorState.blocks.map(block =>
          editorState.document.getClosest(block.key, parent => {
            return predicate(parent as Block);
          })
        );
        if (matchingBlocks.size > 0) {
          return matchingBlocks.get(0) as Block;
        }
      }
    }
  }

  isActive = () => {
    return Boolean(this.getCurrentNode());
  }

  remove = () => {
    const { config, editor } = this;
    if (config.customRemove) {
      config.customRemove(editor);
    } else if (config.pluginType === 'component') {
      if (config.object === 'mark') {
        editor.removeMark(config.type);
      } else if (config.object === 'inline') {
        editor.unwrapInline(config.type);
      } else if (config.object === 'block') {
        if (config.replaceOnRemove) {
          editor.setBlocks(config.replaceOnRemove);
        } else {
          editor.unwrapBlock(config.type);
        }
      }
    } else {
      // not implemented yet for data type
    }
  }

  add = (passedData?: T) => {
    const { config, editor } = this;
    const data =
      passedData || (config.getInitialData ? config.getInitialData() : null);
    if (this.isActive()) {
      // is active, we just update the node with the new data
      const node = this.getCurrentNode();
      if (node.object !== 'mark') {
        editor.setNodeByKey(node.key, {
          type: node.type,
          key: node.key,
          nodes: node.nodes,
          data,
        });
        return;
      }
      // don't know how to update marks data :-o so just remove and re-add
      this.remove();
    }

    editor.focus();
    this.addNew(data);
    editor.moveToEnd();
  }
  addNew = (data?: T) => {
    const { config, editor } = this;
    if (config.customAdd) {
      config.customAdd(editor);
    } else if (config.pluginType === 'component') {
      const props = data
        ? {
            type: config.type,
            data,
          }
        : config.type;

      if (config.object === 'mark') {
        editor.addMark(props);
      } else if (config.object === 'inline') {
        editor.wrapInline(props);
      } else if (config.object === 'block') {
        if (config.replaceOnRemove) {
          editor.setBlocks(props);
        } else {
          editor.wrapBlock(props);
        }
      }
    } else if (config.pluginType === 'data') {
      if (config.object === 'block') {
        const el = editor.value.blocks.get(0);
        editor.setBlocks({
          type: el && el.type,
          data: el ? el.data.mergeDeep(data) : data,
        });
      } else if (config.object === 'inline') {
        const el = editor.value.inlines.get(0);
        editor.setInlines({
          type: el && el.type,
          data: el ? el.data.mergeDeep(data) : data,
        });
      } // not implemented for marks, makes no sense
    }
  }
}
