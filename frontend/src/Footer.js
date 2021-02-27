import { Box, Container, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <Container>
        <Grid 
          container
          spacing={1}
          justify="center"
        >
          <Grid item sm={8}>
            <Box display='flex'>
              <image /> {/* Add image of the website */}
              <Typography>Website Name</Typography>
            </Box>
            <Box>
              The Website name is a website dedicated to help consumers identify 
              good games currently on the market and see what games other people 
              like.
            </Box> 
          </Grid>
          
          <Grid item sm={4}>
            <Typography variant='h6'>
              Section 2
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center">Copyright © Website name</Box>
      </Container>
    )
  }
}

export default Footer
