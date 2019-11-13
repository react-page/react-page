import * as React from 'react';
import Editor from '../../';
import { ReduxProvider } from '../../reduxConnect';
import { editable } from '../../selector/editable';
import { EditorState } from '../../types/editor';
import DragDropProvider from '../DragDropProvider';
import HotKeyDecorator from '../HotKey/Decorator';
import BlurGate from './BlurGate';
import Inner from './Inner';

export type PropTypes = {
  id: string;
  editor: Editor;
  onChange?: Function;
};
class Editable extends React.PureComponent<PropTypes> {
  unsubscribe: Function;
  previousState: EditorState = {};

  constructor(props: PropTypes) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.id) {
      throw new Error('The state must have an unique id');
    }

    this.unsubscribe = this.props.editor.store.subscribe(this.onChange);
    this.previousState = null;
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
    if (state === this.previousState || !state) {
      return;
    }

    const serialized = this.props.editor.plugins.serialize(state);
    onChange(serialized);
  }

  render() {
    const {
      id,
      editor: { store, defaultPlugin },
    } = this.props;

    return (
      <ReduxProvider store={store}>
        <DragDropProvider>
          <HotKeyDecorator id={id}>
            <BlurGate>
              <Inner id={id} defaultPlugin={defaultPlugin} />
            </BlurGate>
          </HotKeyDecorator>
        </DragDropProvider>
      </ReduxProvider>
    );
  }
}

export default React.memo(Editable);
