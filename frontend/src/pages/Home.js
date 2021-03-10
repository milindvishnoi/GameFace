import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import Grid1x3 from '../components/Grid1x3';
import TopGames from '../components/TopGames';
import './home.css';
// will be called from API
import { games } from '../data'

export class Home extends Component {
  state = {
    gridObject: [
      {
        title: 'Building a Community',
        imgSrc: '/images/community.svg',
        desc: 'Hi'
      },
      {
        title: 'Top 10 Games',
        imgSrc: '/images/sign.svg',
        desc: 'Hi'
      },
      {
        title: 'Get a unbiased review',
        imgSrc: '/images/review.svg',
        desc: 'HI'
      }
    ]
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
          mb={4}>
          <Typography variant='h1' color='primary'>
            Top Games
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {games.map((game, index) => (
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