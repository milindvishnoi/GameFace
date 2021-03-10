import React, { Component } from 'react'
import { Box, Typography, Button, Container, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';

// Inspired by (URL)
export class PersonalPage extends Component {
  state={
    email: '',
    emailError: false,
    emailErrorMessage: '',
    page: 1
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
    const { logout } = this.props

    return (
        <Box className='personal-profile'>
            <Box>
                <img 
                  className='cover-image'
                  src={ process.env.PUBLIC_URL + user.coverPic } />
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <img 
                className='personal-picture'
                src={ process.env.PUBLIC_URL + user.profilePic } />
              <Typography className="userName" variant="h3">
                @{ user.username }
              </Typography>
              <Typography className="userBio" variant="h5">
                { user.bio }
              </Typography>
            </Box>

          <ProfileTab />
          
          <Link to='/'>
            <Button className="logout-button" onClick={ logout }>Logout</Button>
          </Link>
      </Box>
    )
  }
}

export default PersonalPage
