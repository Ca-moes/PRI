import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@mui/material";

const pages = {
  'Phones': '/items',
  'Reviews': '/reviews',
  'About Us': 'https://www.captiongenerator.com/1558322/Souto-be-like'
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}>
            <img src="/pri-logo-white.png" alt="Phone Prime Logo" height={40}/>
          </Link>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {Object.entries(pages).map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Link href={page[1]} textAlign="center" underline="none">{page[0]}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href="/" sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <img src="/pri-logo-white.png" alt="Phone Prime Logo" height={40}/>
          </Link>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {Object.entries(pages).map((page) => (
              <Link
                key={page[0]}
                href={page[1]}
                underline="none"
                sx={{my: 2, color: 'white', display: 'block', margin: 'auto'}}
              >
                {page[0]}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;