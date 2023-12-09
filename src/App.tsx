import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
     <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
    </QueryClientProvider>
    </>
  );
};

export default App;
