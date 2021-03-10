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
              Username: <span className="content">{this.state.username}</span>
              </div>
              <div className="infoTitle" variant="h3">
              Nickname: <span className="content">{this.state.nickname}</span>
              </div>
              <div className="infoTitle" variant="h3">
              Country: <span className="content">{this.state.country}</span>
              </div>
              
          </div>
          
          
         )
      }  
        
      </div>   
    )
  }
}

export default ProfileTabPanel
