import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';



const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography color="inherit" sx={{margin: 'auto'}}>
          Phone prime &copy; 2022
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;