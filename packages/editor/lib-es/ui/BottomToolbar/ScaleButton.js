import { IconButton, Tooltip } from '@mui/material';
import ScaleIcon from '@mui/icons-material/AspectRatio';
import React from 'react';
import { useUiTranslator } from '../../core/components/hooks';
var SCALING_FACTORS = [1, 0.8, 0.6, 1.2];
var lastScale = SCALING_FACTORS[0]; // poor mans redux
export var ScaleButton = function (_a) {
    var _b;
    var scale = _a.scale, setScale = _a.setScale;
    var t = useUiTranslator().t;
    var toggleScale = React.useCallback(function () {
        var newScalingFactor = SCALING_FACTORS[(SCALING_FACTORS.indexOf(lastScale !== null && lastScale !== void 0 ? lastScale : scale) + 1) %
            SCALING_FACTORS.length];
        setScale(newScalingFactor);
        // poor man's redux
        lastScale = newScalingFactor;
    }, [scale, lastScale, setScale]);
    return (React.createElement(Tooltip, { title: (_b = t('Change size of this window')) !== null && _b !== void 0 ? _b : '' },
        React.createElement(IconButton, { onClick: toggleScale, "aria-label": "Change size of this window", color: "primary" },
            React.createElement(ScaleIcon, null))));
};
//# sourceMappingURL=ScaleButton.js.map