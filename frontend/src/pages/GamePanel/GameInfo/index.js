import React, { Component } from 'react'
import { Button, Grid} from '@material-ui/core'
import "./styles.css";
import { HighlightOff } from '@material-ui/icons';
import { removeGame } from "./../actions";

export class GameInfo extends Component {
  render() {
    const {
      game,
      gamePan
      
    } = this.props;

    return (
      <Grid className="game" container spacing={3}>
        <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
          <div className="gameInfo">
              {game.gameName}
          </div>
        </Grid>
        
        

        <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
          <div className="gameInfo">
              {game.ign}
          </div>
        </Grid>

        <Grid
          className="game_remove-botton-grid"
          item
          xl={2}
          lg={2}
          md={12}
          s={12}
          xs={12}
        > 
          <Button
            variant="contained"
            color="primary"
            onClick={() => removeGame(gamePan, game)}
            className="game__remove-button"
            startIcon={<HighlightOff />}
          >
            Delete
          </Button>
         
          
            
          
        </Grid>
      </Grid>
    );
  }
}

export default GameInfo
