import Editor, { getTextContents } from '@react-page/editor';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import { demo } from '../../sampleContents/demo';

export default function ReadOnly() {
  const [value, setValue] = useState(demo);
  useEffect(() => {
    console.log(
      'raw text contents',
      getTextContents(value, { cellPlugins, lang: 'en' })
    );
  });
  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        lang="en"
        onChange={setValue}
      />
    </PageLayout>
  );
}
