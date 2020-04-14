import '@react-page/core/lib/index.css'; // we also want to load the stylesheets
import Editor from '@react-page/editor';
import '@react-page/ui/lib/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
// The content state
import contents from './contents';
import customLayoutPluginWithInitialState from './customLayoutPluginWithInitialState';
import { plugins } from './plugins';
import './styles.css';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TRACE_UPDATES
) {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

// tslint:disable-next-line:no-any
const KeepStateEditor = ({ value, ...props }: any) => {
  const [state, setState] = React.useState(value);
  // console.log(state);

  // here you would normally persist the state somewhere (e.g a database)
  // <Editor /> is stateful, so you don't nesseary have to keep the value updated
  // if you do, you have to guarantee that the value is referencially equal to what has been passed by `onChange`
  // or the editor will blur its fields (and other problems)
  return <Editor {...props} value={state} onChange={setState} />;
};
// Render the editables - the areas that are editable
const elements = document.querySelectorAll<HTMLDivElement>('.editable');
elements.forEach((element, index) => {
  ReactDOM.render(
    <KeepStateEditor
      plugins={plugins}
      defaultPlugin={customLayoutPluginWithInitialState()}
      value={contents[index]}
    />,
    element
  );
});

// Render as beautified mark up (html)
ReactDOM.render(
  <Editor plugins={plugins} value={contents[0]} readOnly={true} />,
  document.getElementById('editable-static')
);
