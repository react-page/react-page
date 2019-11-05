/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

// The editor core
import Editor, { Editable, createEmptyState } from '@react-page/core';
import '@react-page/core/lib/index.css'; // we also want to load the stylesheets

// The default ui components
import EditorUi from '@react-page/ui';
import '@react-page/ui/lib/index.css';

// Renders json state to html, can be used on server and client side
import { HTMLRenderer } from '@react-page/renderer';

// The content state
import content from './content';
import './styles.css';
import { plugins } from './plugins';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TRACE_UPDATES
) {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const editor = new Editor({
  plugins: plugins,
  // pass the content states
  editables: [
    ...content,
    // creates an empty state, basically like the line above
    createEmptyState(),
  ],
});

editor.trigger.mode.edit();

// Render the editables - the areas that are editable
const elements = document.querySelectorAll<HTMLDivElement>('.editable');
elements.forEach(element => {
  ReactDOM.render(
    <Editable
      editor={editor}
      id={element.dataset.id as string}

      /*onChange={(state) => {
        if (element.dataset.id === '1') {
          console.log(state)
        }
      }}*/
    />,
    element
  );
});

// Render the ui controls, you could implement your own here, of course.
ReactDOM.render(
  <EditorUi editor={editor} />,

  document.getElementById('controls')
);

// Render as beautified mark up (html)
ReactDOM.render(
  <HTMLRenderer state={content[0]} plugins={plugins} />,
  document.getElementById('editable-static')
);

editor.trigger.editable.add({ id: '10', cells: [] });
