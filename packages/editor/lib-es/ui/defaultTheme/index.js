import { createTheme } from '@mui/material';
export var defaultThemeOptions = {
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard',
            },
        },
    },
};
export var defaultTheme = createTheme(defaultThemeOptions);
//# sourceMappingURL=index.js.map