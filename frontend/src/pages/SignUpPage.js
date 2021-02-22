import React, { Component } from 'react'
import { Box, Typography, TextField, Grid, Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export class SignUpPage extends Component {
  render() {
    return (
      <Container maxWidth="xs">
        <Box display="flex" 
           flexDirection="column"
           alignItems="center" 
           justifyContent="center" 
           mt={7}
           >
        <Box mb={3}>
          <Typography variant="h5">
            Sign Up
          </Typography>
        </Box>
        <form noValidate>
        <Grid 
          container
          spacing={1}
          justify="center"
          >
          <Grid item sm={6} xs={12}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fname"
                label="First Name"
                name="fname"
                autoComplete="first_name"
                autoFocus
                />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="last_name"
                autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
            </Grid>
          </Grid>
          <Box mb={2}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign In
            </Button>
          </Box>
          <Link to='/login'>
            <Typography variant='body2' align='right'>
              Already a member. Sign In!
            </Typography>
          </Link>
        </form>
        </Box>
      </Container>
    )
  }
}

export default SignUpPage
