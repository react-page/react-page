import { useMediaQuery, useTheme } from '@material-ui/core';

export const useIsSmallScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};
