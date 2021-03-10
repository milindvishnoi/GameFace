import { Box, Button, Chip,  Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './GamePage.css'
import Post from '../components/post'
import TextForm from '../components/textform'
// The appropriate game data to be imported from a server (description is from the PS4 website for 2K21)
import { games, posts } from '../data'

//The game selected to display
const displayGame = games[0];

// Sample Post Content
const post1 = posts[0];
const post2 = posts[1];

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
            <TextForm
                buttonName="Create New Post"
                buttonVar="contained"
                buttonColor="primary"
                formTitle="Create New Post"
                formInstructions="Start an engaging discussion:" 
                formLabel="" 
                formRows={10} 
                sendFormName="Post"
                hasTitle={true}
              />
          </Box>
          <Box id="postsSection">
            <Post username={post1.username}
                  content={post1.postContent}
                  title={post1.title}
                  likes={post1.likes}
                  dislikes={post1.dislikes}
                  replies={post1.replies}/>
            <Post username={post2.username}
                  content={post2.postContent}
                  title={post2.title}
                  likes={post2.likes}
                  dislikes={post2.dislikes}
                  replies={post2.replies}/>
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

  export default Game