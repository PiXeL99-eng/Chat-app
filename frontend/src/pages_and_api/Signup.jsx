import React, { useState, useContext, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { signup_background, chit_chat_logo_2 } from '../assets'
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { signUpCall } from './apiCalls';
import { purple } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 1,
  borderRadius: '9px'
};

const theme = createTheme();

export default function SignUp() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const error_message = useRef(null)

  const navigate = useNavigate();
  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  useEffect(() => {

    // console.log("inside signup", user)

      if(user){
          return navigate("/");
      }

  }, [])

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')
    const password = data.get('password')
    const username = data.get('firstName') + ' ' + data.get('lastName')

    error_message.current = await signUpCall({email: email, password: password, username: username}, dispatch)

    if (error_message.current){
      handleOpen()
      console.log(error_message.current)
    }
    else{
      console.log(user)
      navigate("/")       
    }
  };

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(4,255,231)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiFormLabel-root': {
      color: 'rgb(4,255,231)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (

    <>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Alert severity="error">{error_message.current}</Alert>
          </Typography>
        </Box>
      </Modal>

      { !isFetching && !user &&
      
          <ThemeProvider theme={theme} >
            <Container component="main" maxWidth='xs'>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'white'
                }}
              >
                <div className="glass-effect-signup"></div>
                <img src={signup_background} alt="" className='signup-background'/>
                <Avatar alt="Chit-Chat" src={chit_chat_logo_2} />
                <Typography component="h1" variant="h5" pt={1}>
                  Sign up to Chit-Chat 🥂
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CssTextField
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        autoComplete='off'
                        inputProps={{
                          style: {
                            color: 'white',
                            fontWeight: '400'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CssTextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="off"
                        InputProps={{
                          style: {
                            color: 'white',
                            fontWeight: '400'
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CssTextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        InputProps={{
                          style: {
                            color: 'white',
                            fontWeight: '400'
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CssTextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        InputProps={{
                          style: {
                            color: 'white',
                            fontWeight: '400'
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, background: 'rgb(217,87,230)' }}>
                    Sign Up
                  </ColorButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2" color={'#ff65ff'}>
                        Already have an account? Log in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
          </ThemeProvider>

      }
    
    </>
  );
}