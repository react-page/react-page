import React, { useState } from 'react';

// The editor core
import Editor, { Value } from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
// import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/plugins-image';
// background
import background from '@react-page/plugins-background';
import PageLayout from '../../components/PageLayout';

// Stylesheets for the rich text area plugin
// uncomment this
//import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for the imagea plugin
//import '@react-page/plugins-image/lib/index.css';

// Define which plugins we want to use.
const cellPlugins = [slate(), image, background({})];

// Remove samples stylesheet cell padding, highlight cell and editor boundaries to demonstrate the cell spacing.
const styles = `
.react-page-cell-inner-leaf {
  padding: 0;
}
.react-page-cell-inner > div {
  outline: 1px solid red;
}
.react-page-editable {
  outline: 1px solid green;
}
`;

export default function SimpleExample() {
  const [value, setValue] = useState<Value>(null);

  return (
    <PageLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        cellSpacing={20}
      />
    </PageLayout>
  );
}
