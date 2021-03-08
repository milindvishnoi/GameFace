import { Box, Button, ButtonBase } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './loginButton.css'

export class LoginButton extends Component {
  render() {
    const { adminLogin, userLogin } = this.props

    return (
      <div>
        { (adminLogin || userLogin) ?
          <div className='user'>
            <Link to='/personal'>
              <ButtonBase 
                size='medium'
                color="inherit">
                  <img 
                    className='user' 
                    src={ process.env.PUBLIC_URL + '/images/user.jpeg' } />
              </ButtonBase>
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
