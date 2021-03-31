import React, { Component } from 'react'
import { user } from '../../data'
import GameAddForm from "./GameAddForm"
import GameList from "./GameList"
import {addGame} from "./actions"

const usergames = user.games
export class GamePanel extends Component {
     //hardcoded data for testing.
    state = {
        gameName: "",
        ign: "",
        games: usergames
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
    const { index, page } = this.props

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
          </div>
         )
      }  
        
      </div>   
    )
  }
}

export default GamePanel
