import React, { Component } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user, admin } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

export class UserPage extends Component {
  state={
    page: 1
  }

  render() {
    const { userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn, user } = this.props;
    const isLoggedIn = userLoggedIn || gameAdminLoggedIn || siteAdminLoggedIn;
    const isAdmin = gameAdminLoggedIn || siteAdminLoggedIn;

    const showProfile = () => {if (isLoggedIn) {
      return (
        <Box>
            <Box 
              my={3} 
              display='flex' 
              flexDirection='column' 
              justifyContent='center' 
              alignItems='center'
              >
              <img 
                className='personal-picture'
                src={ user.profilePic } />
              <Typography variant="h4">
                { user.username }
              </Typography>
              <Typography className="userBio" variant="body1">
                { user.bio }
              </Typography>
              <Box mb={2} />
            </Box>

          {isAdmin ? manageButton() : ""}
          
          <ProfileTab 
            gameAdminLoggedIn={gameAdminLoggedIn} 
            siteAdminLoggedIn={siteAdminLoggedIn} 
            userLoggedIn={userLoggedIn}
            user={user}
            />
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
