import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import TopGames from '../components/TopGames';
import './home.css';

// will be called from API
const topGames = [
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
    link: "nba2k22"
  },
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
    link: "nba2k22"
  },
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
    link: "nba2k22"
  }
]

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
                src={process.env.PUBLIC_URL + 'gamepad.svg'} />
            </Box>
            <Typography variant='h1' color='primary'>
              GameFace
            </Typography>
            <Typography variant='h4' align='center' color='navbar'>
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
          {topGames.map((row) => (
            <TopGames imgSrc={row.imgSrc}
                      name={row.name}
                      link={row.link}
                      key={row.name} />
          ))}
        </Grid>
      </div>
    )
  }
}

export default Home 