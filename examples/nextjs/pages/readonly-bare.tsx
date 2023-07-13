import Editor from '@react-page/editor';
import React from 'react';
import { cellPlugins } from '../plugins/cellPlugins';
import { demo } from '../sampleContents/demo';

export default function ReadOnlyBare() {
  return <Editor cellPlugins={cellPlugins} value={demo} lang="en" readOnly />;
}
