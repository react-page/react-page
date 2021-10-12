import React, { useState } from 'react';

// The editor core
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
// import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/plugins-image';
import PageLayout from '../../components/PageLayout';

// Stylesheets for the rich text area plugin
// uncomment this
//import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for the imagea plugin
//import '@react-page/plugins-image/lib/index.css';

// Define which plugins we want to use.
const cellPlugins = [slate(), image];

export default function SimpleExample() {
  const [value, setValue] = useState<Value>(null);
  const [value2, setValue2] = useState<Value>(null);

  return (
    <PageLayout>
      <Editor
        lang="en"
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
      />
      <Editor
        lang="en"
        cellPlugins={cellPlugins}
        value={value2}
        onChange={setValue2}
      />
    </PageLayout>
  );
}
