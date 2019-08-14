import * as React from 'react';
import { ControlProps } from '../types';

import { AutoForm, AutoFields } from 'uniforms-material';
import debounce from 'lodash.debounce';
import { BottomToolbar } from '@react-page/ui';
import {
  darkTheme,
  default as ThemeProvider
} from '@react-page/ui/lib/ThemeProvider';
import makeSchema from './makeSchema';

type State<T> = {
  previewState: T;
};
class Controls<T> extends React.PureComponent<ControlProps<T>, State<T>> {
  state = {
    previewState: null,
  };

  save = debounce((m: T) => this.props.onChange(m), 1000);
  onSubmit = (model: T) => {
    this.setState({ previewState: model });
    this.save(model);
  }
  render() {
    const { focused, state, schema, Renderer } = this.props;
    const { previewState } = this.state;
    return (
      <>
        <Renderer {...this.props} state={previewState || state} />
        <ThemeProvider theme={darkTheme}>
          <BottomToolbar open={focused} theme={darkTheme}>
            <AutoForm
              model={previewState || state}
              autosave={true}
              schema={makeSchema(schema)}
              onSubmit={this.onSubmit}
            >
              <AutoFields />
            </AutoForm>
          </BottomToolbar>
        </ThemeProvider>
      </>
    );
  }
}

export default Controls;
