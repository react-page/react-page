import equals from 'ramda/src/equals';
import * as React from 'react';
import Editor from '../../Editor';
import { editable } from '../../selector/editable';
import { EditorState } from '../../types/editor';
import HotKeyDecorator from '../HotKey/Decorator';
import Inner from './Inner';

export type PropTypes = {
  id: string;
  editor: Editor;
  onChange?: Function;
};
class Editable extends React.PureComponent<PropTypes> {
  unsubscribe: Function;
  previousState: EditorState = {};
  // tslint:disable-next-line:no-any
  previousSerialized: any;

  constructor(props: PropTypes) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.id) {
      throw new Error('The state must have an unique id');
    }

    this.unsubscribe = this.props.editor.store.subscribe(this.onChange);
    this.previousState = null;
    this.previousSerialized = null;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange = () => {
    const { onChange } = this.props;
    if (typeof onChange !== 'function') {
      return;
    }

    const state: EditorState = editable(this.props.editor.store.getState(), {
      id: this.props.id,
    });
    // prevent uneeded updates
    const isEqual = equals(state, this.previousState);

    if (!state || isEqual) {
      return;
    }
    this.previousState = state;

    const serialized = this.props.editor.plugins.serialize(state);

    const serializedEqual = equals(this.previousSerialized, serialized);

    if (serializedEqual) {
      return;
    }
    this.previousSerialized = serialized;
    onChange(serialized);
  }

  render() {
    const {
      id,
      editor: { defaultPlugin },
    } = this.props;

    return (
      <HotKeyDecorator id={id}>
        <Inner id={id} defaultPlugin={defaultPlugin} />
      </HotKeyDecorator>
    );
  }
}

export default React.memo(Editable);
