import React from 'react';
import { connectField } from 'uniforms';
import ColorPicker from './ColorPicker';
import { colorToString, stringToColor } from './colorToString';
import { useUiTranslator } from '../../core/components/hooks';

const ColorPickerField = connectField<{
  value: string;
  label: string;
  onChange: (v: string | void) => void;
}>((props) => {
  const { t } = useUiTranslator();
  return (
    <ColorPicker
      style={{ marginBottom: 8 }}
      color={stringToColor(props.value)}
      buttonContent={t(props.label) ?? ''}
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
