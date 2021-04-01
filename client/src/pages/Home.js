import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import Grid1x3 from '../components/Grid1x3';
import TopGames from '../components/TopGames';
import './home.css';
// Importing actions/required methods
import { getAllGames } from "../actions/games";


export class Home extends Component {
  state = {
    gridObject: [
      {
        title: 'Building a Community',
        imgSrc: '/images/community.svg',
        desc: 'A discussion board where you could just share your opinion'
      },
      {
        title: 'Top 10 Games',
        imgSrc: '/images/sign.svg',
        desc: '10 most popular games in all categories and regions'
      },
      {
        title: 'Get a unbiased review',
        imgSrc: '/images/review.svg',
        desc: 'Checkout how other people feel about a game'
      }
    ],
    gameList: []
  }

  componentDidMount() {
    // send HTTP request
    // save it to the state
    getAllGames(this)
  }
  
  render() {
    return (
      <div>
        <Box 
          height="88vh" 
          display="flex" 
          flexDirection="column"
          alignItems="center" 
          justifyContent="center"
          >
            <Box mr={2}>
              <img 
                className='home-logo'
                src={ process.env.PUBLIC_URL + 'gamepad.svg' }
                alt="Company's Logo" />
            </Box>
            <Typography variant='h1' color='primary'>
              GameFace
            </Typography>
            <Typography variant='h4' align='center'>
              Find your game!
            </Typography>
        </Box>

        <Grid1x3 gridObject={this.state.gridObject} />

        <Box
          mb={6}
          mt={2}>
          <Typography variant='h1' color='primary'>
            Top Games
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {this.state.gameList.map((game, index) => (
            <TopGames imgSrc={game.imgSrc}
                      title={game.title}
                      link={game.link}
                      gameIndex={index}
                      key={index} />
          ))}
        </Grid>
      </div>
    )
  }
}

export default Home 