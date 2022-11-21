import React from 'react';
import { connectField } from 'uniforms';
import ColorPicker from './ColorPicker';
import { colorToString, stringToColor } from './colorToString';
import { useUiTranslator } from '../../core/components/hooks';
var ColorPickerField = connectField(function (props) {
    var _a;
    var t = useUiTranslator().t;
    return (React.createElement(ColorPicker, { style: { marginBottom: 8 }, color: stringToColor(props.value), buttonContent: (_a = t(props.label)) !== null && _a !== void 0 ? _a : '', onChange: function (v) {
            props.onChange(colorToString(v));
        } }));
});
/**
 * A component that can be used in autoforms (uniforms)
 */
export default ColorPickerField;
//# sourceMappingURL=ColorPickerField.js.map