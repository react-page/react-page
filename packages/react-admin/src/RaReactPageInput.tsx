import Editor, { EditorProps } from '@react-page/editor';
import React from 'react';

import { Labeled, useInput } from 'react-admin';

const RaReactPageInput: React.FC<
  {
    label?: string;
    source: string;
  } & EditorProps
> = ({ label = 'Content', source, ...editorProps }) => {
  const {
    input: { value, onChange },
  } = useInput({ source });
  return (
    <Labeled label={label} source={source} fullWidth>
      <Editor value={value} onChange={onChange} {...editorProps} />
    </Labeled>
  );
};

export default RaReactPageInput;
