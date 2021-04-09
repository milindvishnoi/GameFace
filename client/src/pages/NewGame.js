import { Grid, Typography, Container, Box, TextField, Button } from '@material-ui/core';
import React, { Component } from 'react'
import { addNewGame } from '../actions/games'

export class NewGame extends Component {
  state = {
    title: '',
    description: ''
  }

  changeHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.id;
    if (name === 'profilePic')
      this.setState({[name]: target.files[0]});
    else
      this.setState({[name]: target.value});
  }

  render() {
    return (
      <Container maxWidth="xs">
        <form onSubmit={(e) => {
            e.preventDefault();
            addNewGame(e.target, this);}
          }>
          <Box m={2}>
            <Typography variant='p' color='primary'>Upload profile photos</Typography>
            <input type="file" name='image' id="image" onChange={this.changeHandler}/>
          </Box>
          <Grid container spacing={1} justify="center">
            <Grid item sm={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={this.state.title}
                    onChange={this.changeHandler}
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  onChange={this.changeHandler}
                  value={this.state.description}
                  name="description"
                  label="description"
                  type="description"
                  id="description"
                  />
              </Grid>
          </Grid>
          <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
              >
                  Add Game
              </Button>
        </form>
      </Container>
    )
  }
}

export default NewGame
