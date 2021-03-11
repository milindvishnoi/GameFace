import React, { Component } from 'react'
import { Box, Typography, Button, Container, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';

// Inspired by (URL)
export class PersonalPage extends Component {
  render() {
    const { logout } = this.props

    return (
        <Box>
            <Box>
                <img 
                  className='cover-image'
                  src={ process.env.PUBLIC_URL + user.coverPic } />
            </Box>
            <Box mb={5} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <img 
                className='personal-picture'
                src={ process.env.PUBLIC_URL + user.profilePic } />
              <Typography className="userName" variant="h3">
                @{ user.username }
              </Typography>
              <Typography className="userBio" variant="h5">
                { user.bio }
              </Typography>
              <Box mt={2}>
                <Link to='/'>
                  <Button className="logout-button" onClick={ logout }>Logout</Button>
                </Link>
              </Box>
            </Box>

          <ProfileTab />
      </Box>
    )
  }
}

export default PersonalPage
