import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


const TopNavbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', width:'98vw', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ color: '#CFCFCF', fontWeight: 'bold' }}
          >
            FOLKLOF
          </Typography>

          <Button sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none' }}>
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavbar;
