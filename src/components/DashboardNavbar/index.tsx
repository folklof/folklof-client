import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const executeSearch = () => {
    console.log(`Navigating to search with title: ${searchTerm}`);
    navigate(`/search?title=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      executeSearch();
    }
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (searchTerm) {
      const timer = setTimeout(() => {
        executeSearch();
      }, 100);
      setDebounceTimer(timer);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [searchTerm]);
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', padding: '0 10vw' }}>
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
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{
              marginRight: "10px",
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
