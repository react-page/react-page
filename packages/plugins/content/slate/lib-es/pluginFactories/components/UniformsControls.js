var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { makeUniformsSchema, AutoForm, AutoFields } from '@react-page/editor';
import React, { useCallback, useRef, useState } from 'react';
function Controls(props) {
    var uniformsSchema = props.schema
        ? makeUniformsSchema(props.schema)
        : null;
    var hasSchema = Boolean(props.schema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var formRef = useRef();
    var _a = __read(useState(null), 2), text = _a[0], setText = _a[1];
    var onCancel = function () {
        props.close();
    };
    var saveAndCloseWithData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (data) {
        props.close();
        if (props.shouldInsertWithText) {
            props.add({ text: text, data: data });
        }
        else {
            props.add({ data: data });
        }
    }, [props.shouldInsertWithText, text]);
    var submitForm = useCallback(function () {
        if (formRef.current) {
            formRef.current.submit();
        }
    }, [formRef.current]);
    var onOkClick = useCallback(function () {
        if (uniformsSchema) {
            submitForm();
        }
        else {
            saveAndCloseWithData({});
        }
    }, [submitForm, saveAndCloseWithData, hasSchema]);
    var onRemove = function () {
        props.remove();
        props.close();
    };
    return (React.createElement(Dialog, { disableEnforceFocus: true, PaperProps: {
            style: { minWidth: 300 },
        }, open: props.open },
        React.createElement(DialogContent, null,
            !props.shouldInsertWithText ? null : (React.createElement("div", { style: { marginBottom: '1em' } },
                React.createElement(TextField, { autoFocus: true, placeholder: 'Text', onChange: function (e) { return setText(e.target.value); }, value: text }))),
            hasSchema && uniformsSchema ? (React.createElement(AutoForm, { ref: formRef, 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                model: props.data, schema: uniformsSchema, onSubmit: saveAndCloseWithData },
                React.createElement(AutoFields, null))) : null),
        React.createElement(DialogActions, null,
            React.createElement(Button, { variant: "text", onClick: onCancel, style: { marginRight: 'auto' } }, props.cancelLabel || 'Cancel'),
            props.isActive ? (React.createElement(Button, { variant: "contained", color: "secondary", onClick: onRemove },
                props.removeLabel || 'Remove',
                React.createElement(DeleteIcon, { style: { marginLeft: 10 } }))) : null,
            hasSchema ? (React.createElement(Button, { variant: "contained", color: "primary", onClick: onOkClick },
                props.submitLabel || 'Ok',
                React.createElement(DoneIcon, { style: { marginLeft: 10 } }))) : null)));
}
export default Controls;
//# sourceMappingURL=UniformsControls.js.map