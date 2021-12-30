import React, { useState } from 'react';

// The editor core
import type { Value } from '@react-page/editor';
import { createValue } from '@react-page/editor';
import { Button } from '@material-ui/core';
import Editor from '@react-page/editor';

import slate from '@react-page/plugins-slate';

import { pluginFactories } from '@react-page/plugins-slate';
import PageLayout from '../../components/PageLayout';

const formFieldPlugin = pluginFactories.createComponentPlugin<{
  fieldName: string;
  placeholder: string;
}>({
  Component: (props) => {
    return (
      <input
        placeholder={props.placeholder}
        type="text"
        onChange={(e) =>
          console.log(
            'filled out field ' + props.fieldName + ', with ' + e.target.value
          )
        }
      />
    );
  },
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        fieldName: {
          type: 'string',
        },
        placeholder: {
          type: 'string',
        },
      },
    },
  },
  addHoverButton: true,
  addToolbarButton: true,
  type: 'FormField',
  object: 'inline',
  isVoid: true, // <--- makes it a void plugin

  icon: <span>FormField</span>,
  label: 'FormField',
});
// customize slate to add the custom slate plugin
const customSlate = slate((config) => ({
  ...config,
  plugins: {
    ...config.plugins,
    form: {
      formField: formFieldPlugin,
    },
  },
}));
const cellPlugins = [customSlate];
// prettier-ignore
const SAMPLE_VALUE: Value = createValue( { rows: [ [ { plugin: customSlate, data: { slate: [ { type: 'PARAGRAPH/PARAGRAPH', children: [ { text: 'Hello, my Name is ', }, { type: 'FormField', data: { fieldName: 'firstname', placeholder: 'fill Firstname', }, children: [ { text: '', }, ], }, { text: ' ', }, { type: 'FormField', data: { fieldName: 'lastname', placeholder: 'fill Lastname', }, children: [ { text: '', }, ], }, { text: ' and i work as a ', }, { type: 'FormField', data: { fieldName: 'jobDescription', placeholder: 'Job Description', }, children: [ { text: '', }, ], }, ], }, ], }, }, ], ], }, { cellPlugins, lang: 'default' } );

export default function SimpleExample() {
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<Value>(SAMPLE_VALUE);

  return (
    <PageLayout>
      <Button onClick={() => setReadOnly(!readOnly)}>Toggle read only</Button>
      <Editor
        readOnly={readOnly}
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
      />
    </PageLayout>
  );
}
