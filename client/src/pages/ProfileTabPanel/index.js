import React, { Component } from 'react'
import { Box, Button, Chip,  Grid, Typography } from '@material-ui/core'
import TextForm from '../../components/textform'
import EditIcon from '@material-ui/icons/Edit';
import "./styles.css";



export class ProfileTabPanel extends Component {

    
    state = {
        readProps: false, 
        canEditName: true,
        username: null,
        nickname: "no nickname in model",
        country: null
    }


  updateState = (attr, newAttr) => {
    if (attr === "user") {
      this.setState({
        username: newAttr
      })
    } else if (attr === "nick") {
      this.setState({
        nickname: newAttr
      })
    } else if (attr === "count") {
      this.setState({
        country: newAttr
      })
    }
  }

  render() {
    const { index, page, user} = this.props

    if (this.state.readProps === false) {

      this.setState({
        readProps: true,
        username: user.username,
        country: user.country
      })
    }

    const addEditUsername = () => {
      if (this.state.canEditName === true) {
        return (
          <TextForm
              buttonName="Edit Username"
              buttonVar="outlined"
              buttonColor="primary"
              formTitle="Update Your Old Username"
              formInstructions="New username:" 
              formLabel="" 
              formRows={1} 
              sendFormName="Edit"
              defaultText={this.state.username}
              hasTitle={false}
              onSubmit={(attr) => this.updateState("user", attr)}
              siconType={<EditIcon />}
            />
        )
      }
    }
    
    return (
      <div> 
        {
          index === page && (
          <div>
          <div className="infoPanel">
            <div className="infoTitle w-100">
              <Typography variant='h5'> Username: {this.state.username} </Typography>
              {addEditUsername()}
            </div>
            <div className="infoTitle">
              <Typography variant='h5'> Nickname: {this.state.nickname} </Typography>
              <TextForm
                buttonName="Edit Nickname"
                buttonVar="outlined"
                buttonColor="primary"
                formTitle="Update Your Nickname"
                formInstructions="New nickname:" 
                formLabel="" 
                formRows={1} 
                sendFormName="Edit"
                defaultText={this.state.nickname}
                hasTitle={false}
                onSubmit={(attr) => this.updateState("nick", attr)}
                siconType={<EditIcon />}
              />
            </div>
            <div className="infoTitle">
              <Typography variant='h5'> Country: {this.state.country} </Typography>
              <TextForm
                buttonName="Edit Country"
                buttonVar="outlined"
                buttonColor="primary"
                formTitle="Update Your Country"
                formInstructions="New country:" 
                formLabel="" 
                formRows={1} 
                sendFormName="Edit"
                defaultText={this.state.country}
                hasTitle={false}
                onSubmit={(attr) => this.updateState("count", attr)}
                siconType={<EditIcon />}
              />
            </div>
          </div>
          </div>
         )
      }  
        
      </div>   
    )
  }
}

export default ProfileTabPanel
