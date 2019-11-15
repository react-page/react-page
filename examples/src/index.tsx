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

// Render the editables - the areas that are editable
const elements = document.querySelectorAll<HTMLDivElement>('.editable');
elements.forEach((element, index) => {
  ReactDOM.render(
    <Editor
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
