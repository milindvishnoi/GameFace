import { Box, Typography } from '@material-ui/core'
import React, { Component } from 'react'

export class Home extends Component {
  render() {
    return (
      <div>
        <Box height="88vh" display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h2'>Website Name</Typography>
        </Box>
      </div>
    )
  }
}

export default Home 