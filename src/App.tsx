import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "./context/AuthContext";
import theme from './theme/theme';
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
    <AuthProvider>
     <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
    </QueryClientProvider>
    </AuthProvider>
    </>
  );
};

export default App;
