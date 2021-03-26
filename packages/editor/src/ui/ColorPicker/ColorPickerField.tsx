import React from 'react';
import { connectField } from 'uniforms';
import ColorPicker from './ColorPicker';
import { colorToString, stringToColor } from './colorToString';

const ColorPickerField = connectField<{
  value: string;
  label: string;
  onChange: (v: string) => void;
}>((props) => {
  return (
    <ColorPicker
      style={{ marginBottom: 8 }}
      color={stringToColor(props.value)}
      buttonContent={props.label}
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
