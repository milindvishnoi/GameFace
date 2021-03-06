import React, { Component } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { user, admin } from '../data'
import './PersonalPage.css';
import ProfileTab from './ProfileTab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import TextForm from '../components/textform'

export class UserPage extends Component {
  state={
    page: 1
  }

  render() {
    const { userLoggedIn, gameAdminLoggedIn, siteAdminLoggedIn, user, updateInfo } = this.props;
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

                  <TextForm
                    buttonName=""
                    buttonVar="outlined"
                    buttonColor="primary"
                    formTitle="Update Your bio"
                    formInstructions="New bio:" 
                    formLabel="" 
                    formRows={1} 
                    sendFormName="Edit"
                    defaultText={""}
                    hasTitle={false}
                    onSubmit={(attr) => this.props.updateInfo("bio", attr)}
                    siconType={<EditIcon />}
                  />
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
            updateInfo={updateInfo}
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
