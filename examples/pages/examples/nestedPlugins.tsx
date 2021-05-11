import React, { useState } from 'react';

// The editor core
import type { CellPlugin, Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/plugins-image';
import PageLayout from '../../components/PageLayout';
import { Button } from '@material-ui/core';

const fullSlate = slate();
const simpleSlate = slate((def) => ({
  ...def,
  title: 'reduced slate',
  plugins: {
    headings: {
      h3: def.plugins.headings.h3((d) => ({
        ...d,
        getStyle: () => ({ color: 'red' }),
      })),
    },
    paragraphs: def.plugins.paragraphs,
    emphasize: def.plugins.emphasize,
  },
}));
const aPluginThatIsOnlyAllowedInsideAnotherOne: CellPlugin = {
  id: 'some-other-plugin',
  title: 'Some plugin',
  description: 'Some plugin that is only available inside another plugin',
  Renderer: (props) => (
    <div>
      <p>Helloooo</p>
    </div>
  ),
  version: 1,
};
const aPlugin: CellPlugin = {
  id: 'some-plugin',
  title: 'Some plugin with different cellPlugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid black' }}>{props.children}</div>
  ),
  cellPlugins: [simpleSlate, aPluginThatIsOnlyAllowedInsideAnotherOne],
  version: 1,
  cellStyle: {
    padding: 0,
  },
};

const anotherPlugin: CellPlugin = {
  id: 'some-plugin-2',
  title: 'Some plugin that extends the parent plugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid black' }}>{props.children}</div>
  ),
  cellPlugins: (plugins) => [
    simpleSlate,
    aPluginThatIsOnlyAllowedInsideAnotherOne,
    ...plugins.filter((p) => p.id !== 'some-plugin-2'),
  ],
  version: 1,
  cellStyle: {
    padding: 0,
  },
};

const deeplyNestedC: CellPlugin = {
  id: 'some-plugin-c',
  title: 'Some plugin C with nested child plugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid orange' }}>
      <p>{props.nodeId}</p>
      {props.children}
    </div>
  ),
  cellPlugins: [simpleSlate],
  version: 1,
  cellStyle: {
    padding: 0,
  },
};

const deeplyNestedB: CellPlugin = {
  id: 'some-plugin-b',
  title: 'Some plugin B with nested child plugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid red' }}>
      <p>{props.nodeId}</p>
      {props.children}
    </div>
  ),
  cellPlugins: [simpleSlate, deeplyNestedC],
  version: 1,
  cellStyle: {
    padding: 0,
  },
};

const deeplyNestedA: CellPlugin = {
  id: 'some-plugin-a',
  title: 'Some plugin A with needply nested child plugins',
  Renderer: (props) => (
    <div style={{ border: '5px solid blue' }}>
      <p>{props.nodeId}</p>
      {props.children}
    </div>
  ),
  cellPlugins: [simpleSlate, deeplyNestedB],
  version: 1,
  cellStyle: {
    padding: 0,
  },
};

const cellPlugins = [fullSlate, image, aPlugin, anotherPlugin, deeplyNestedA];

export default function NestedPluginsExample() {
  const [value, setValue] = useState<Value>(null);
  const [readOnly, setReadOnly] = useState(false);

  return (
    <PageLayout>
      <Button onClick={() => setReadOnly(!readOnly)}>
        {readOnly ? 'read only' : 'editable'}
      </Button>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        readOnly={readOnly}
      />
    </PageLayout>
  );
}
