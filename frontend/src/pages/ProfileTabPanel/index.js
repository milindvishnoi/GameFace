import React, { Component } from 'react'
import "./styles.css";
import { user } from '../../data'

//For test convenience.
const currentUser = user;

export class ProfileTabPanel extends Component {

    //hardcoded data for testing.
    state = {
        username: currentUser.username,
        nickname: currentUser.nickname,
        country: currentUser.country

    }

  render() {
    const { index, page } = this.props
    
    return (
      <div> 
        {
          index === page && (
          <div>
              <div className="infoTitle" variant="h3">
              Username: {this.state.username}
              </div>
              <div className="infoTitle" variant="h3">
              Nickname: {this.state.nickname}
              </div>
              <div className="infoTitle" variant="h3">
              Country: {this.state.country}
              </div>
              
          </div>
          
          
         )
      }  
        
      </div>   
    )
  }
}

export default ProfileTabPanel
