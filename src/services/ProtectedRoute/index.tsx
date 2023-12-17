import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkUserAuthentication } from '../../api';
import { Box, LinearProgress } from '@mui/material';

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkUserAuthentication();
        setIsAuthenticated(true);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
