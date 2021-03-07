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
            <Button 
                href="/login"
                color='inherit'
                size='large'
                >
                Login
              </Button>
              <Button 
                href="/signup" 
                color='inherit'
                size='large'
                >
                Sign up
              </Button>
              <Button 
                href="/personal" 
                color='inherit'
                size='large'
              >
                Personal Page
            </Button>
          </Box>
        }
      </div>
    )
  }
}

export default LoginButton
