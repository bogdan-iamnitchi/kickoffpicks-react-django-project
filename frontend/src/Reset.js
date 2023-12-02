import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import SportsIcon from '@mui/icons-material/Sports';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from './images/background.jpg';
import "./stiles/link.css";
import logo from './images/logo.png';

function Copyright(props) {
    return (
      <Typography variant="body2" color="white" align="center" {...props}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
        <br />
        <a href="https://github.com/BRA-Team">
          <img src={logo} alt="Logo" style={{ width: '180px', height: '30px', marginTop: '10px'}} />
        </a>
      </Typography>
    );
  }

const defaultTheme = createTheme();

export default function Reset() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      newPassword: data.get('newPassword'), // Retrieve new password
      confirmPassword: data.get('confirmPassword'), // You can add a confirm password field
    });
    // Add logic for password reset here
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="false" sx={{ height: '120vh', background: 'linear-gradient(76.8deg, rgb(121,45,129) 3.6%, rgb(36,31,98) 90.4%)', backgroundSize: 'cover',display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
        <CssBaseline />
        <Box
          sx={{
            width: '50vh',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red' }}>
            <SportsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              padding: '20px',
              backgroundColor: 'rgba(96, 96, 96, 0.5)',
              borderRadius: '10px',
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                style: { color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' },
              }}
              InputProps={{
                style: { color: 'white', borderColor: 'white' },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              InputLabelProps={{ style: { color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' } }}
              InputProps={{ style: { color: 'white', borderColor: 'white' } }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              InputLabelProps={{ style: { color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' } }}
              InputProps={{ style: { color: 'white', borderColor: 'white' } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="link" // Apply the link class to the button
            >
              Reset Password
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link
                to="/signin"
                variant="body2"
                className="link" // Apply the link class to the Link
              >
                Back to Login
              </Link>
            </Box>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
