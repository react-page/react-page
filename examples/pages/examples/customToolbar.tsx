import React, { useState } from 'react';
import Editor, { Options, Value } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import { ExampleCustomBottomToolbar } from '../../components/ExampleCustomBottomToolbar';
import { Button } from '@material-ui/core';

const cellPlugins = [slate(), image];

// Custom bottom toolbar example with collapse/restore functionality.
const customToolbarExample = () => {
  const [value, setValue] = React.useState<Value>(null);

  const [useCustom, setUseCustom] = useState(true);
  // make sure that you memoize custom components property to avoid unnesseary rerenders
  const components = React.useMemo<Options['components']>(
    () => (useCustom ? { BottomToolbar: ExampleCustomBottomToolbar } : {}),
    [useCustom]
  );

  return (
    <>
      <Button onClick={() => setUseCustom(!useCustom)}>
        Toggle custom toolbar
      </Button>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        components={components}
      />
    </>
  );
};

export default customToolbarExample;
