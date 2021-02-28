import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import TopGames from '../components/TopGames';
// import nba from '../public/topGames/nba2k22.jpg'

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
          alignItems="center" 
          justifyContent="center"
          >
          <Typography variant='h1'>
            Website Name
          </Typography>
        </Box>

        <Box
          mb={4}>
          <Typography variant='h3'>
            Top 10 Games
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {topGames.map((row) => (
            <TopGames imgSrc={row.imgSrc}
                      name={row.name}
                      key={row.name} />
          ))}
        </Grid>
        {/* <img src={nba} /> */}
      </div>
    )
  }
}

export default Home 