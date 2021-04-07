import React, { Component } from 'react'
import { Box, 
         Typography, 
         TextField, 
         Grid, 
         Container, 
         Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { signUp } from '../actions/user'

// Inspired by (https://material-ui.com/getting-started/templates/sign-up/)
export class SignUpPage extends Component {
  state={
    profilePic: null,
    password: '',
    username: ''
  }

  changeHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.id;
    if (name === 'profilePic')
      this.setState({[name]: target.files[0]});
    else
      this.setState({[name]: target.value});
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
            <Grid item sm={12}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.username}
                  onChange={this.changeHandler}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={this.changeHandler}
                value={this.state.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
            </Grid>
            <Grid item xs={12}>
              <Box m={2}>
                <label htmlFor="uploadFile">Upload profile photos</label>
                <input type="file" name='image' id="profilePic" onChange={this.changeHandler}/>
              </Box>
            </Grid>
          </Grid>
          <Box mb={2}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                                  e.preventDefault();
                                  signUp(this) 
                                }}
            >
                Sign Up
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
