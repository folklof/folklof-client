import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser as logoutUserRedux } from '../../store/userSlice';
import { UserRootState } from '../../types';
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { logoutUser } from '../../api/auth';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getFirstAndSecondName } from '../../utils/Helper/GetFirstAndSecondName';

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
                sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none' }}
                onClick={handleMenuClick}
              >
                <Avatar src={userProfile.avatar} sx={{ width: 40, height: 40 }} />&ensp;
                {getFirstAndSecondName(userProfile.username)}&ensp;
                {userProfile.role_id === 3 && <VerifiedIcon sx={{ color: "#448aff" }} />}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem> */}
                <MenuItem onClick={handleProfile} >Profile Setting</MenuItem>
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
