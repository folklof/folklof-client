import { createTheme } from "@mui/material/styles";

// Extending the TypographyVariants interface
declare module "@mui/material/styles" {
  interface TypographyVariants {
    logotype?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    logotype?: React.CSSProperties;
  }
}
const theme = createTheme({
  typography: {
    logotype: {
      fontFamily: "eixample-dip, serif",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "1.8rem",
    },
    h1: {
      fontFamily: "eixample-dip, sans-serif",
      fontWeight: 700,
      fontSize: "3rem",
    },

    h4: {
      fontFamily: "eixample-dip, sans-serif",
      fontWeight: 700,
      '@media (max-width:768px)': {
        fontSize: '1.2rem',
      }
    },

    h5: {
      fontFamily: "eixample-dip, sans-serif",
      fontWeight: 700,
      fontSize: "1.5rem",
      '@media (max-width:768px)': {
        fontSize: '1.2rem',
      }
    },

    h6: {
      fontFamily: "elza-text, sans-serif",
      fontWeight: 400,
      fontSize: "1.5rem",
      '@media (max-width:768px)': {
        fontSize: '1rem',
      }
    },

    body1: {
      fontFamily: "elza-text, sans-serif",
      fontWeight: 400,
    },
  },
});

export default theme;
