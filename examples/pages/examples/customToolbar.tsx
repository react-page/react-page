import React from 'react';
import Editor, { Value } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import BottomToolbar from '../../components/BottomToolbar';

const cellPlugins = [slate(), image];

// Custom bottom toolbar with collapse/restore functionality.
const CustomToolbar = () => {
  const [value] = React.useState<Value>(null);

  const components = React.useMemo(
    () => ({ BottomToolbar: BottomToolbar }),
    []
  );

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} components={components} />
    </>
  );
};

export default CustomToolbar;
