import { Box, Button, Chip, DialogTitle, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './GamePage.css'
import Post from '../components/post'
// The appropriate game data to be imported from a server (description is from the PS4 website for 2K21)
import { games } from '../data'

//The game selected to display
const displayGame = games[0];

// Sample Post Content
const username = "some_user_1234"
const content = "Lorem ipsum dolor sit amet, \
consectetur adipiscing elit, sed do \
eiusmod tempor incididunt ut labore \
et dolore magna aliqua. Ut enim ad \
minim veniam, quis nostrud exercitation \
ullamco laboris nisi ut aliquip ex ea \
commodo consequat. Duis aute irure dolor \
 in reprehenderit in voluptate velit esse \
  cillum dolore eu fugiat nulla pariatur. \
   Excepteur sint occaecat cupidatat non \
   proident, sunt in culpa qui officia \
   deserunt mollit anim id est laborum."

export class Game extends Component {
    render() {

      const splitDescription = (str) => {
        /* Splits <str> appropriatley depending on where \n is in the text */
        return(
          <div>
            {str.split("\n").map((pargph) => (<Typography>{pargph}<br/></Typography>))}
          </div>
        )
      }
      return (
        <div>
          <Box mb={4}>
          <GameHeader gameTitle={displayGame.title}
                      rating={displayGame.score}
                      description={ () => splitDescription(displayGame.description)}/> 
          </Box>
          <Box textAlign="right">
            {/*
            <Button variant='contained' color='primary'>
              Create New Review
            </Button>
            */}
            <CreatePostForm />
          </Box>
          <Box style={{marginLeft: 180, marginRight: 180}}>
            <Post username={username}
                  content={content}/>
            <Post username={username}
                  content={content}/>
          </Box>
        </div>
      )
    }
  }

  class GameHeader extends Component {
    render() {
      const { gameTitle, description, rating } = this.props;

      return (
          <Box marginTop="2vh">
            <Grid container spacing={2} justify="center">
              <Grid item xs={4}>
                <div align="center">
                  <img class="gameIcon" src={process.env.PUBLIC_URL + displayGame.imgSrc} />
                  <Typography>Rating: { rating }%</Typography>
                  <Button variant='outlined'>Upvote</Button>
                </div>
              </Grid>
              <Grid id="descriptionPanel" item xs={8}>
                <Typography variant='h1' color='primary'>
                  { gameTitle }
                </Typography>
                <Typography><br/>{ description() }<br/></Typography>
                {/* For Game Admin and above only:
                  <div style={{marginTop: 2}}>
                    <Button>Create Tag</Button>
                  </div>
                */}
                <Box display='flex'>
                  {displayGame.tags.map((tagContent) => (
                    <Box mr={1}>
                      <Chip label={tagContent} size='medium' />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
          
      )
    }
  }

  class CreatePostForm extends Component {
      state = { 
        showPopup: false 
      }

      closePopup = () => {
        this.setState({
          showPopup: false
        })
      }

      openPopup = () => {
        this.setState({
          showPopup: true
        })
      }

      render() {
        return (
          <div>
              <Button variant='contained' color='primary' onClick={this.openPopup}>
                Create New Review
              </Button>
              <Dialog open={this.state.showPopup} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a New Post</DialogTitle>
                <DialogContent className="createForm">
                  <Box id="formItem">
                    <DialogContentText>
                      Make an interesting Title
                    </DialogContentText>
                    <TextField
                      id="outlined-basic" 
                      label="" 
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                  <Box id="formItem">
                    <DialogContentText>
                      Write a review
                    </DialogContentText>
                    <TextField
                      label=""
                      id="outlined-multiline-static"
                      multiline
                      rows={10}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={this.closePopup}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={this.closePopup}>
                    Post
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        )}
  }

  class Tag extends Component {
    render () {
      const { content } = this.props;
      return (
        <Grid id="tag" item>
          <Typography>{ content }</Typography>
        </Grid>
      )
    }
  }

  export default Game