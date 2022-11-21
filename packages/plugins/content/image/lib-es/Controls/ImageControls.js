import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ImageUpload, useUiTranslator } from '@react-page/editor';
import React from 'react';
var ImageControls = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var t = useUiTranslator().t;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { display: 'flex' } },
            props.imageUpload && (React.createElement(React.Fragment, null,
                React.createElement(ImageUpload, { translations: props.translations, imageUpload: props.imageUpload, imageUploaded: function (image) {
                        return props.onChange({
                            src: image.url,
                        });
                    } }),
                React.createElement(Typography, { variant: "body1", style: { margin: '20px 16px 0 16px' } }, t((_a = props.translations) === null || _a === void 0 ? void 0 : _a.or)))),
            React.createElement(TextField, { placeholder: (_c = t((_b = props.translations) === null || _b === void 0 ? void 0 : _b.srcPlaceholder)) !== null && _c !== void 0 ? _c : '', label: t(props.imageUpload
                    ? (_d = props.translations) === null || _d === void 0 ? void 0 : _d.haveUrl
                    : (_e = props.translations) === null || _e === void 0 ? void 0 : _e.imageUrl), name: "src", 
                // style={{ flex: 1 }}
                value: (_f = props.data.src) !== null && _f !== void 0 ? _f : '', onChange: function (e) {
                    return props.onChange({
                        src: e.target.value,
                    });
                } })),
        React.createElement("br", null),
        React.createElement(TextField, { placeholder: (_h = t((_g = props.translations) === null || _g === void 0 ? void 0 : _g.hrefPlaceholder)) !== null && _h !== void 0 ? _h : '', label: (_k = t((_j = props.translations) === null || _j === void 0 ? void 0 : _j.hrefLabel)) !== null && _k !== void 0 ? _k : '', name: "href", style: { width: '400px' }, value: (_l = props.data.href) !== null && _l !== void 0 ? _l : '', onChange: function (e) {
                return props.onChange({
                    href: e.target.value,
                });
            } }),
        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: (_m = props.data.openInNewWindow) !== null && _m !== void 0 ? _m : false, onChange: function (e) {
                    return props.onChange({
                        openInNewWindow: e.target.checked,
                    });
                } }), label: t((_o = props.translations) === null || _o === void 0 ? void 0 : _o.openNewWindow) }),
        React.createElement("br", null),
        React.createElement(TextField, { placeholder: (_q = t((_p = props.translations) === null || _p === void 0 ? void 0 : _p.altPlaceholder)) !== null && _q !== void 0 ? _q : '', label: (_s = t((_r = props.translations) === null || _r === void 0 ? void 0 : _r.altLabel)) !== null && _s !== void 0 ? _s : '', name: "alt", style: { width: '400px' }, value: (_t = props.data.alt) !== null && _t !== void 0 ? _t : '', onChange: function (e) {
                return props.onChange({
                    alt: e.target.value,
                });
            } })));
};
export default ImageControls;
//# sourceMappingURL=ImageControls.js.map