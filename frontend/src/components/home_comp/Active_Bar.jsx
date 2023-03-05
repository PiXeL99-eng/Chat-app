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
import {fetchReceiver} from "../../pages/apiCalls"
import { AuthContext } from '../../contexts/AuthContext';
import stringAvatar from './avatar_generator';

// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ActiveBar(props) {
    
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [receiver, setReceiver] = useState('')
  const {user} = useContext(AuthContext)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    //if is not group

    const func_fetch_receiver = async () => {

      const data = await fetchReceiver(props.conversationId)
      // const data = await fetchText('63fc5dd9eec9dcf6ded271ac')

      if(data.isGroup){
        setReceiver(data.groupName)
      }
      else{
        if(data.members[0].email === user.email){
          setReceiver(data.members[1].username)
        }
        else{
          setReceiver(data.members[0].username)
        }
      }
    }

    func_fetch_receiver()

  }, [props.conversationId])

  return (
    <AppBar position="static" sx={{backgroundColor: "#202c33"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar {...stringAvatar(`${receiver}`)} />
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
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {receiver}
            
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
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

}
