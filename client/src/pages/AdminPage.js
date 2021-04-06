import React, { Component } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user, admin } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

export class UserPage extends Component {
  state={
    page: 1
  }

  render() {
    const { logout, userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn } = this.props;
    const isLoggedIn = userLoggedIn || gameAdminLoggedIn || siteAdminLoggedIn;
    const isAdmin = gameAdminLoggedIn || siteAdminLoggedIn;

    const profile = isAdmin ? admin : user

    const showProfile = () => {if (isLoggedIn) {
      return (
        <Box>
            <Box>
                <img 
                  className='cover-image'
                  src={ process.env.PUBLIC_URL + profile.coverPic } />
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
                src={ process.env.PUBLIC_URL + profile.profilePic } />
              <Typography variant="h4">
                @themarkyone
                {(isAdmin) ? <SupervisorAccountIcon /> : ""}
              </Typography>
              <Typography className="userBio" variant="body1">
                { profile.bio }
              </Typography>
              <Box mb={2} />
            </Box>

          {isAdmin ? manageButton() : ""}
          
          <ProfileTab 
            gameAdminLoggedIn={gameAdminLoggedIn} 
            siteAdminLoggedIn={siteAdminLoggedIn} 
            userLoggedIn={userLoggedIn}/>
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

export default UserPage
