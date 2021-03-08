import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import TopGames from '../components/TopGames';
import './home.css';
// will be called from API
import { games } from '../data'

export class Home extends Component {
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