import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DashboardNavbar: React.FC = () => {
  return (
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', padding:'0 10vw' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '15vw' }}>
            Library
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '15vw' }}>
            Categories
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', marginRight: '10vw' }}>
            Favourite
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            position: 'relative',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
            marginLeft: 'auto',
            width: 'auto',
            maxWidth: '300px',
          }}>
            <Box sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Find your great stories..."
              sx={{
                marginRight:"10px",
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px calc(1em + 32px)',
                },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default DashboardNavbar;
