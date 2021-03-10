import { Box, Button, ButtonBase } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './loginButton.css'

export class LoginButton extends Component {
  state = {
    anchor: null
  }

  setAnchor = (value) => {
    this.setState({
      anchor: value
    })
  }

  handleClick = (event) => {
    this.setAnchor(event.currentTarget);
  }

  handleClose = () => {
    this.setAnchor(null);
  }

  closeAndLogOut = () => {
    this.handleClose();
    this.props.logout();
  }

  render() {
    const { adminLogin, userLogin } = this.props
    const { anchor } = this.state

    return (
      <div>
        { (adminLogin || userLogin) ?
          <div className='user'>
            <ButtonBase 
              size='medium'
              color="inherit"
              onClick={this.handleClick}>
                <img 
                  className='user' 
                  src={ process.env.PUBLIC_URL + '/images/user.jpeg' }
                  alt='profile' />
            </ButtonBase>
            <Menu
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={this.handleClose}
            >
              <Link to='/personal'>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Link>
              <MenuItem onClick={this.closeAndLogOut}>Logout</MenuItem>
            </Menu>
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
