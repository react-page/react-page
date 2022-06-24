import { useMediaQuery, useTheme } from '@mui/material';

export const useIsSmallScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};
