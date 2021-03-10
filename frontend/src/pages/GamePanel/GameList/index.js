import React, { Component } from 'react'
import { uid } from "react-uid";
import GameInfo from "./../GameInfo";


export class GameList extends Component {
  render() {
    const {
      games,
      gamePan
      
    } = this.props;

    return (
      <div>
       
            {games.map((game) => {
                return (
                
                        <GameInfo 
                            key={uid(
                            game
                            )}
                            game = {game}
                            gamePan = {gamePan}
                        />
                   
                )
            })}
       
        
      </div>
    );
  }
}

export default GameList
