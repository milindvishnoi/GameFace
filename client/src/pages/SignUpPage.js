import React, { Component } from 'react'
import { Box, 
         Typography, 
         TextField, 
         Grid, 
         Container, 
         Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

// Inspired by (https://material-ui.com/getting-started/templates/sign-up/)
export class SignUpPage extends Component {
  state={
    email: '',
    emailError: false,
    emailErrorMessage: ''
  }

  validate = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let reg = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(value)
    console.log(reg)
    reg ? this.setState({
        [name]: value,
        emailErrorMessage: "",
        error: false
      }) : this.setState({
        [name]: value,
        emailErrorMessage: "Please fill in a valid email.",
        error: true
      })
  }

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
        <form>
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
                    onChange={this.validate}
                    value={this.state.email}
                    error={this.state.error}
                    helperText={ this.state.emailErrorMessage }
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
                disabled={!this.state.error}
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
