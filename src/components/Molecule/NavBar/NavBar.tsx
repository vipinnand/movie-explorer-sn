import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

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
      sx={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0))",
        boxShadow: "none",
        px: 2,
        py: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Typography
          variant="h6"
          sx={{
            color: "red",
            fontWeight: "bold",
            fontSize: "1.8rem",
            letterSpacing: 1,
          }}
        >
          
        </Typography>

        {/* Right: Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Home Button with Link */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white", textTransform: "none" }}>Home</Button>
          </Link>

          {/* Wishlist Button with Link */}
          <Link to="/Wishlist" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white", textTransform: "none" }}>Wishlist</Button>
          </Link>
          <Box>
            <Button
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                borderRadius: "20px",
                textTransform: "none",
                px: 2,
              }}
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
              MenuListProps={{
                "aria-labelledby": "language-button",
              }}
            >
              <MenuItem onClick={handleLangClose}>English</MenuItem>
              <MenuItem onClick={handleLangClose}>Hindi</MenuItem>
              <MenuItem onClick={handleLangClose}>Spanish</MenuItem>
            </Menu>
          </Box>

          {/* Sign In Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#e6e6e6",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
