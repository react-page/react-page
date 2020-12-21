import React, { useState } from 'react';
import Editor, { Value } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';

const cellPlugins = [slate(), image];

// Bare without page layout for bundle size debugging
const Bare = () => {
  const [value] = useState<Value>(null);

  return (
    <>
      <Editor cellPlugins={cellPlugins} value={value} readOnly />
    </>
  );
};
export default Bare;
