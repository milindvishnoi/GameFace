import { TextField, FormControlLabel, Checkbox, Button, Typography, Box } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


// Inspired by (URL)
export class LoginPage extends Component {
  render() {
    const { login } = this.props

    return (
      <Box display="flex" 
           flexDirection="column"
           alignItems="center" 
           justifyContent="center" 
           height="88vh">
        <Box mb={4}>
          <Typography variant="h5">
            Sign In
          </Typography>
        </Box>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Link to='/'>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={ login }
            >
                Sign In
            </Button>
          </Link>
        </form>
      </Box>
    )
  }
}

export default LoginPage
