import React, { Component } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import ProfileTabPanel from '../ProfileTabPanel'
import DiscussionPanel from '../DiscussionPanel'
import GamePanel from "../GamePanel"


export class ProfileTab extends Component {
  state = {
    page: 0
  }
  
  handleChangeTab = (event, val) => {
    this.setState({
      page: val
    })
  }

  render() {
    const { gameAdminLoggedIn, siteAdminLoggedIn, userLoggedIn, user } = this.props;
    

    return (
      
      <div> 
        <AppBar position='static'>
            <Tabs
                onChange={this.handleChangeTab}
                value={this.state.page} 
                aria-label="profile tabs">
              <Tab label="Profile" />
              <Tab label="Discussions" />
              <Tab label="Games" />

            </Tabs>
        </AppBar>
        <ProfileTabPanel 
          user={user}
          isSiteAdmin={gameAdminLoggedIn || siteAdminLoggedIn}
          index={0}
          page={this.state.page}
        />

        <DiscussionPanel 
          user={user}
          index={1}
          page={this.state.page}
          userLoggedIn={userLoggedIn}
          gameAdminLoggedIn={gameAdminLoggedIn} 
          siteAdminLoggedIn={siteAdminLoggedIn}
        />
        
        <GamePanel
          index={2}
          page={this.state.page}
        />

      </div>   
    )
  }
}

export default ProfileTab
