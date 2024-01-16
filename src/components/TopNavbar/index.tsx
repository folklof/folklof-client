import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser as logoutUserRedux } from '../../store/userSlice';
import { UserRootState } from '../../types';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { logoutUser } from '../../api/auth';
import { getFirstAndSecondName } from '../../utils/Helper/GetFirstAndSecondName';

import VerifiedIcon from '@mui/icons-material/Verified';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const userProfile = useSelector((state: UserRootState) => state.user.user);

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

  const handleProfile = async () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logoutUserRedux());
    queryClient.removeQueries('userProfile');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant={"logotype" as never} noWrap sx={{ color: '#CFCFCF', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogoClick}>
            folklof
          </Typography>
          {userProfile ? (
            <>
              <Button
                sx={{ marginTop: 1, color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none', borderRadius: '10px', border: '1px solid grey' }}
                onClick={handleMenuClick}
              >
                <Avatar src={userProfile.avatar} sx={{ width: 40, height: 40 }} />&ensp;
                {getFirstAndSecondName(userProfile.username)}&ensp;
                {userProfile.role_id === 3 && <VerifiedIcon sx={{ color: "#448aff" }} />}
              </Button>
              <Menu
                disableScrollLock
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                  style: {
                    backgroundColor: '#FFF',
                    color: '#333',
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: '#333' }} />
                  </ListItemIcon>
                  <Typography variant="inherit">Profile Setting</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon sx={{ color: '#333' }} />
                  </ListItemIcon>
                  <Typography variant="inherit">Sign Out</Typography>
                </MenuItem>
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
