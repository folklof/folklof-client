import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, useMediaQuery, Box, Typography} from '@mui/material';
import { AuthProvider } from "./context/AuthContext";
import theme from './theme/theme';
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width:1024px)');

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            {isLargeScreen ? (
              <AppRoutes />
            ) : (
              <Box sx={{ textAlign: 'center', marginTop: '50%'}}>
                <Typography sx={{color:"white"}}variant="h5"> Website is currently only available on larger screens.</Typography>
                <Typography sx={{color:"white"}} variant="body1">Please access the website from a device with a wider screen.</Typography>
              </Box>
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
