import React, { Component } from 'react'
import { Box, Typography, Button, Container, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

// Inspired by (URL)
export class PersonalPage extends Component {
  state={
    page: 1
  }

  render() {
    const { logout, userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn } = this.props;
    const isLoggedIn = userLoggedIn || gameAdminLoggedIn || siteAdminLoggedIn;
    const isAdmin = gameAdminLoggedIn || siteAdminLoggedIn;
    const showProfile = () => {if (isLoggedIn) {
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
                {(isAdmin) ? <SupervisorAccountIcon /> : ""}
              </Typography>
              <Typography className="userBio" variant="body1">
                { user.bio }
              </Typography>
              <Box mb={2} />
            </Box>

          {isAdmin ? manageButton() : ""}
          
          <ProfileTab isAdmin={isAdmin}/>
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
    }}

    const manageButton = () => {
      return (
      <Link to='/' className="game__manage-button">
        <Button
        variant="outlined"
        startIcon={<ImportContactsIcon />}
      >
        Manage Game
      </Button>
      </Link>
      )
    }

    return (
      <div>
        {showProfile()}
      </div> 
    )
  }
}

export default PersonalPage
