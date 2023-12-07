import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'eixample-dip, sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
    },

    h4: {
        fontFamily: 'eixample-dip, sans-serif',
      fontWeight: 700,
    },

    h5: {
    fontFamily: 'eixample-dip, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
    },

    h6: {
      fontFamily: 'elza-text, sans-serif',
      fontWeight: 400,
      fontSize: '1.5rem',
    },
  },
});

export default theme;
