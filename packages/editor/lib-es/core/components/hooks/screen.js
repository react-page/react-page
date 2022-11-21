import { useMediaQuery, useTheme } from '@mui/material';
export var useIsSmallScreen = function () {
    var theme = useTheme();
    return useMediaQuery(theme.breakpoints.down('sm'));
};
//# sourceMappingURL=screen.js.map