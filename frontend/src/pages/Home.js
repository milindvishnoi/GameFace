import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import TopGames from '../components/TopGames';
// import nba from '../public/topGames/nba2k22.jpg'

const topGames = [
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
  },
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
  },
  {
    name: "NBA 2K22",
    imgSrc: "/topGames/nba2k22.jpg",
  }
]

export class Home extends Component {
  render() {
    return (
      <div>
        <Box height="88vh" display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h2'>Website Name</Typography>
        </Box>

        <Typography variant='h3'>Top 10 Games</Typography>
        <Grid container spacing={4}>
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