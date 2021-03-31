import React, { Component } from 'react'
import { Button, Grid } from '@material-ui/core'
import "./styles.css";
import Input from "../Input";


export class GameAddForm extends Component {
  render() {
    const {
      gameName,
      ign,
      handleChange,
      addGame
      
    } = this.props;

    return (
      <Grid className="game-form" container spacing={3}>
        {/* Inputs to add game */}
        <Input
          name="gameName"
          value={gameName}
          onChange={handleChange}
          label="Game Name"
        />

        <Input
          name="ign"
          value={ign}
          onChange={handleChange}
          label="In Game ID"
        />
 
        <Grid
          className="game-form__button-grid"
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
            onClick={addGame}
            className="game-form__submit-button"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default GameAddForm
