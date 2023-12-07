import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
    </>
  );
};

export default App;
