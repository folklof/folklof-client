import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LPNavbar: React.FC = () => {
  const navigate = useNavigate();
 


  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

 

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant={"logotype" as any} noWrap sx={{ color: '#CFCFCF', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogoClick}>
            folklof
          </Typography>
          <Button
            sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none' }}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LPNavbar;
