import { Box, Button, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

export class LoginButton extends Component {
  render() {
    const { adminLogin, userLogin } = this.props

    return (
      <div>
        { (adminLogin || userLogin) ?
          <div>
            <Link to='/personal'>
              <IconButton 
                size='medium'
                color="inherit">
                  <AccountCircle />
              </IconButton>
            </Link>
          </div> 
          : 
          <Box display='flex'>
            <Button 
                color='inherit'
                size='large'
                >
                  <Link to='/login'>
                    Login
                  </Link>
              </Button>
              <Button 
                color='inherit'
                size='large'
                >
                  <Link to='/signup'>
                    Sign up
                  </Link>
              </Button>
          </Box>
        }
      </div>
    )
  }
}

export default LoginButton
