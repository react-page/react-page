import React from 'react';
import { connectField } from 'uniforms';
import ColorPicker from './ColorPicker';
import { colorToString, stringToColor } from './colorToString';

const ColorPickerField = connectField<{
  value: string;
  onChange: (v: string) => void;
}>((props) => {
  return (
    <ColorPicker
      color={stringToColor(props.value)}
      onChange={(v) => {
        props.onChange(colorToString(v));
      }}
    />
  );
});

/**
 * A component that can be used in autoforms (uniforms)
 */
export default ColorPickerField;
