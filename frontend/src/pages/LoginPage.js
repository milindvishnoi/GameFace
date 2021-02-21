import { TextField, FormControlLabel, Checkbox, Button, Typography, Box } from '@material-ui/core'
import React, { Component } from 'react'

export class LoginPage extends Component {
  render() {
    return (
      <Box display="flex" 
           flexDirection="column"
           alignItems="center" 
           justifyContent="center" 
           height="88vh">
        <Box mb={4}>
          <Typography variant="h5">
            Sign in
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </Box>
    )
  }
}

export default LoginPage
