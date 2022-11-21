import React from 'react';
import PluginButton from './PluginButton';
import { useTheme } from '@mui/material';
var Controls = function (props) {
    var plugins = props.plugins, translations = props.translations;
    var theme = useTheme();
    var dark = theme.palette.mode === 'dark';
    return (React.createElement("div", null, plugins &&
        plugins.map(function (plugin, i) {
            return plugin.addToolbarButton ? (React.createElement(PluginButton, { key: i, translations: translations, plugin: plugin, dark: dark })) : null;
        })));
};
export default React.memo(Controls);
//# sourceMappingURL=Controls.js.map