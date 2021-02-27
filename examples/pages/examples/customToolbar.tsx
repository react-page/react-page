import React from 'react';
import Editor, { Value } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import { ExampleCustomBottomToolbar } from '../../components/ExampleCustomBottomToolbar';

const cellPlugins = [slate(), image];

// Custom bottom toolbar example with collapse/restore functionality.
const CustomToolbar = () => {
  const [value] = React.useState<Value>(null);

  // make sure that you memoize custom components property to avoid unnesseary rerenders
  const components = React.useMemo(
    () => ({ BottomToolbar: ExampleCustomBottomToolbar }),
    []
  );

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} components={components} />
    </>
  );
};

export default CustomToolbar;
