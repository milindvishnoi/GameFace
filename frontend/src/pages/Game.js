import { Box, Button, DialogTitle, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './GamePage.css'
import Post from '../components/post'

// The appropriate game data to be imported from a server (description is from the PS4 website for 2K21)
const gameData = [
  {
    title: "NBA2K22",
    score: "77",
    description: "NBA 2K22 is the latest title in the world-renowned, \
                  best-selling NBA 2K series, delivering an industry-leading \
                  sports video game experience on console.\n\n \
                  With extensive improvements upon its best-in-class \
                  graphics and gameplay, competitive and community \
                  online features, and deep, varied game modes, NBA \
                  2K22 offers one-of-a-kind immersion into all facets \
                  of NBA basketball and culture - where Everything is Game.",
    tags: ["Sports", "2K", "Single Player", "Multiplayer", "PS4", "XBox"]
  }
]

//The game selected to display
const displayGame = gameData[0];

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
          <GameHeader gameTitle={displayGame.title}
                      rating={displayGame.score}
                      description={ () => splitDescription(displayGame.description)}/> 
          <Box textAlign="right">
            <Button>Create New Review</Button>
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
            <Grid container spacing={5}>
              <Grid item>
                <img class="gameIcon" src="/topGames/nba2k22.jpg" />
                <div align="center">
                  <Typography>Rating: { rating }%</Typography>
                  <button>Upvote</button>
                </div>
              </Grid>
              <Grid id="descriptionPanel" item>
                <Typography variant='h2'>{ gameTitle }</Typography>
                <Typography><br/>{ description() }<br/></Typography>
                {/* For Game Admin and above only:
                  <div style={{marginTop: 2}}>
                    <Button>Create Tag</Button>
                  </div>
                */}
                <Grid container spacing={2}>
                  {displayGame.tags.map((tagContent) => (<Tag content={tagContent}/>))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
          
      )
    }
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