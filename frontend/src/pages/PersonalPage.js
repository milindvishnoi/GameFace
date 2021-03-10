import React, { Component } from 'react'
import { Box, Typography, Button, Container, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';

// Inspired by (URL)
export class PersonalPage extends Component {
  state={
    page: 1
  }

  render() {
    const { logout } = this.props
    
    return (
        <Box>
            <Box>
                <img 
                  className='cover-image'
                  src={ process.env.PUBLIC_URL + user.coverPic } />
            </Box>
            <Box 
              my={3} 
              display='flex' 
              flexDirection='column' 
              justifyContent='center' 
              alignItems='center'
              >
              <img 
                className='personal-picture'
                src={ process.env.PUBLIC_URL + user.profilePic } />
              <Typography variant="h4">
                @{ user.username }
              </Typography>
              <Typography className="userBio" variant="body1">
                { user.bio }
              </Typography>
              <Box mb={2} />
            </Box>

          <ProfileTab />
          <Box
            my={3}
            display='flex' 
            flexDirection='column' 
            justifyContent='center' 
            alignItems='center'
          >
            <Link to='/'>
              <Button variant='outlined' className="logout-button" onClick={ logout }>Logout</Button>
            </Link>
          </Box>
      </Box>
    )
  }
}

export default PersonalPage
