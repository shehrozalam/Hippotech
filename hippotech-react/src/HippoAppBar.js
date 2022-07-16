import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth';

export default function HippoAppBar() {
  const navigate = useNavigate();
  //const { user, setUser } = React.useContext(UserContext);
  const { user, signin, signout } = useAuth();
  const location = useLocation();

  async function handleLogout() {
    await signout();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick = (newUrl) => {
    setAnchorEl(null);
    if (newUrl) {
      navigate(newUrl);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            onClick={handleClick}
            id="menuIcon"
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClick}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem id="myMortgagesMenuItem" onClick={() => handleMenuClick('/myMortgages')}>My Mortgages</MenuItem>
        <MenuItem id="blogMenuItem" onClick={() => handleMenuClick('/blog')}>Blog</MenuItem>
      </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ () => navigate('/') }>
            HippoTech
          </Typography>
          { 
            !!user ? <Button id="logoutButton" color="inherit" onClick={ async () =>  { await handleLogout(); navigate('/'); }}>Logout</Button> 
                             : <Button id="loginButton" color="inherit" onClick={ () => navigate('/login', { state: { from: location}, replace: true}) }>Login</Button>


          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}