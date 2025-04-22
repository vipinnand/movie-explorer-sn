import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className="appBar"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar className="toolbar">
        <Typography variant="h6" className="logo"></Typography>

        <Box className="menuButtons">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button className="textButton">Home</Button>
          </Link>

          <Link to="/Wishlist" style={{ textDecoration: 'none' }}>
            <Button className="textButton">Wishlist</Button>
          </Link>

          <Box>
            <Button
              className="langButton"
              onClick={handleLangClick}
              startIcon={<LanguageIcon />}
              endIcon={<ArrowDropDownIcon />}
            >
              English
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleLangClose}
              MenuListProps={{ 'aria-labelledby': 'language-button' }}
            >
              <MenuItem onClick={handleLangClose}>English</MenuItem>
              <MenuItem onClick={handleLangClose}>Hindi</MenuItem>
              <MenuItem onClick={handleLangClose}>Spanish</MenuItem>
            </Menu>
          </Box>

          <Button variant="contained" className="signInButton">
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
