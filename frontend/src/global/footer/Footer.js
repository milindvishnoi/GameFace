import { Box, 
        Container, 
        Grid, 
        Typography } from '@material-ui/core'
import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <Container>
        <Box 
          mt={8}
          mb={5}>
          <Grid 
            container
            spacing={4}
            justify="center"
          >
            <Grid item sm={8} xs={12}>
              <Box display='flex' mb={3}>
                <image /> {/* Add image of the website */}
                <Typography variant='h4'>
                  Website Name
                </Typography>
              </Box>
              <Typography variant='body1'>
                <Box maxWidth="420px">
                    The Website name is a website dedicated to help consumers identify 
                    good games currently on the market and see what games other people 
                    like.
                </Box>
                <Box mt={4}>
                  © Website name - 2021
                </Box>
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box display='flex' alignContent='left'>
                <Typography variant='h6' alignLeft>
                  More Links
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }
}

export default Footer
