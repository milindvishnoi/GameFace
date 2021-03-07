import { Box, Button } from '@material-ui/core'
import React, { Component } from 'react'

export class LoginButton extends Component {
  state = {
    login: false
  }

  render() {
    return (
      <div>
        { this.state.login ?
          <div></div> : 
          <Box display='flex'>
            <Box mr={1}>
              <Button 
                href="/login"
                color='inherit'
                size='large'
                >
                Login
              </Button>
            </Box>
            <Button 
              href="/signup" 
              color='inherit'
              size='large'
              >
              Sign up
            </Button>
          </Box>
        }
      </div>
    )
  }
}

export default LoginButton
