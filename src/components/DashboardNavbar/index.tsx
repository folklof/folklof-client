import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import styles from './DashboardNavbar.module.scss';

const DashboardNavbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const executeSearch = () => {
    navigate(`/search?title=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      executeSearch();
    }
  };

  const navigateToLibrary = () => {
    navigate("/library");
  };

  const navigateToCategories = () => {
    navigate("/categories");
  };

  const navigateToFavourites = () => {
    navigate("/favourites");
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (searchTerm) {
      const timer = setTimeout(() => {
        executeSearch();
      }, 1500);
      setDebounceTimer(timer);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [searchTerm]);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} className={styles.dashboardNavbar}>
      <Toolbar className={styles.toolbar}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={navigateToLibrary}>Library</MenuItem>
          <MenuItem onClick={navigateToCategories}>Categories</MenuItem>
          <MenuItem onClick={navigateToFavourites}>Favourites</MenuItem>
        </Menu>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Typography variant="body1" className={styles.navItem} onClick={navigateToLibrary}>
            Library
          </Typography>
          <Typography variant="body1" className={styles.navItem} onClick={navigateToCategories}>
            Categories
          </Typography>
          <Typography variant="body1" className={styles.navItem} onClick={navigateToFavourites}>
            Favourites
          </Typography>
        </Box>

        <Box className={styles.searchBox}>
          <Box className={styles.searchIcon}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Find your great stories..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.inputBase}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
