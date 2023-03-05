import React, {useState, useEffect, useContext} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import {fetchReceiver} from "../../pages/apiCalls"
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutCall } from '../../pages/apiCalls';
import stringAvatar from './avatar_generator';

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Chats', 'Profile', 'New Ping', 'Logout'];

export default function MyDrawer(props) {

    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = useState(null);
    const {user, dispatch} = useContext(AuthContext)
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = (setting) => {

      if(setting === 'Logout'){

        localStorage.clear()
        logoutCall(dispatch)
        navigate('/login')

      }
      else if(setting === ''){
        props.setMode(props.mode)
      }
      else{
        props.setMode(setting)
      }

      setAnchorElUser(null);
    };
  
    return (
      <AppBar position="static" sx={{boxShadow: 0}}>
        <Container maxWidth="xl" sx={{backgroundColor: "#202c33"}}>
          <Toolbar disableGutters>
            <Avatar {...stringAvatar(`${user.username}`)} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                ml: 2,
              //   display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {user.username}
              {/* PingPop */}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}             
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 0 }}
                >
                  <MenuIcon className='drawer-button'/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu('')}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center" className='drawer-settings'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}
