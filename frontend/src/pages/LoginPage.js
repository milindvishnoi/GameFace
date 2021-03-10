import { TextField, FormControlLabel, Checkbox, Button, Typography, Box } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


// Inspired by (URL)
export class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  }

  handelInput = (event) => {
    const id = event.target.id
    const value = event.target.value

    console.log(id, value)

    this.setState({
      [id]: value
    })
  }

  handleClick = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    const { login } = this.props
    const { email, password } = this.state

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
            value={email}
            onChange={this.handelInput}
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
            value={password}
            onChange={this.handelInput}
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
              onClick={ this.handleClick }
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
