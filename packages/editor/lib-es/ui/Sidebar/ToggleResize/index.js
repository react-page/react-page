import Resize from '@mui/icons-material/SettingsOverscan';
import React from 'react';
import { useIsResizeMode, useSetResizeMode, } from '../../../core/components/hooks';
import Button from '../Button/index';
var ToggleResize = function (props) {
    var isResizeMode = useIsResizeMode();
    var setResizeMode = useSetResizeMode();
    return (React.createElement(Button, { icon: React.createElement(Resize, null), description: props.label, active: isResizeMode, onClick: setResizeMode }));
};
export default React.memo(ToggleResize);
//# sourceMappingURL=index.js.map