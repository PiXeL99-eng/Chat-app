import React, { useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { login_background } from '../assets'
import { purple } from '@mui/material/colors';

import { loginCall } from './apiCalls';
import { AuthContext } from '../contexts/AuthContext';

import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  useEffect(() => {

    // console.log("inside login", user)

      if(user){
          return navigate("/");
      }

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')
    const password = data.get('password')

    await loginCall({email: email, password: password}, dispatch)

    console.log(user)

    navigate("/")     //do error handling
  };

  // 'rgb(4,255,231)'
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(217,87,230)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiFormLabel-root': {
      color: 'rgb(217,87,230)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
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
        {
          !isFetching && !user && 
            <ThemeProvider theme={theme}>
              <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    display: 'flex'
                  }}
                >
                  <img src={login_background} alt="" className='login-background'/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
                  sx={{                      
                    background: 'rgb(25,8,38)',
                    color: 'white'
                  }}
                >
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">

                      Log in

                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        InputProps={{
                          style: {
                            color: 'white'
                          },
                        }}
                      />
                      <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        InputProps={{
                          style: {
                            color: 'white'
                          },
                        }}
                      />
                      <ColorButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, background: 'rgb(217,87,230)' }}>
                        {isFetching? (<CircularProgress color="inherit" size={15}/>) : ("Log in")}
                      </ColorButton>
                      <Grid container>
                        <Grid item xs={12}>
                          <Link href="/signup" variant="body2" color={'rgb(217,87,230)'}>
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
        }
    </>
  );
}