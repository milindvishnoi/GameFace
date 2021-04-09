import React, { Component } from 'react'
import GameAddForm from "./GameAddForm"
import GameList from "./GameList"
import {addGame} from "./actions"
import { Box, Button } from '@material-ui/core'


export class GamePanel extends Component {
     //hardcoded data for testing.
    state = {
        readList: false,
        gameName: "",
        ign: "",
        games: []
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value 
        });
    };



  render() {
    const { index, page, user } = this.props
    if (this.state.readList === false) {

      this.setState({
        readList: true,
        games: user.playlist
      })
    }

    return (
      <div> 
        {
          index === page && (
          <div>
            <GameAddForm 
              gameName = {this.state.gameName}
              ign = {this.state.ign}
              handleChange = {this.handleInputChange}
              addGame = {() => addGame(this)}
            />
          
            <GameList 
              games = {this.state.games}
              gamePan = {this}
            
            />
           <Box textAlign='center'>
             <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.updateInfo("playlist", this.state.games)}
                className="game-form__submit-button"
             >
                Save
             </Button>

          </Box>

          </div>
         )
      }  
        
      </div>   
    )
  }
}

export default GamePanel
