import Editor from '@react-page/editor';
import React from 'react';
import PageLayout from '../components/PageLayout';
import { cellPlugins } from '../plugins/cellPlugins';
import { demo } from '../sampleContents/demo';

export default function ReadOnly() {
  return (
    <PageLayout>
      <Editor cellPlugins={cellPlugins} value={demo} lang="en" readOnly />
    </PageLayout>
  );
}
