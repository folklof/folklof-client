import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';
import { getUserProfile, logoutUser } from '../../api/auth';

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { data: userProfile, isSuccess } = useQuery('userProfile', getUserProfile, {
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutUser();
    queryClient.removeQueries('userProfile');
    navigate('/');
  };
  


  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap sx={{ color: '#CFCFCF', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogoClick}>
            FOLKLOF
          </Typography>
          {isSuccess && userProfile ? (
            <>
              <Button
                sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none' }}
                onClick={handleMenuClick}
              >
                {userProfile.username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none' }}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavbar;
