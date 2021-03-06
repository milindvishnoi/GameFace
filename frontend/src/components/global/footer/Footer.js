import { Box, 
        Container, 
        Grid, 
        Typography,
        Link,
        Icon } from '@material-ui/core'
import React, { Component } from 'react'
import './footer.css'

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
            <Link href='/' color="inherit" underline="none">
                <Box display='flex' mb={3}>
                  <Box mr={1}>
                    <img 
                      className='footer-logo' 
                      src={process.env.PUBLIC_URL + 'gamepad.svg'} /> {/* Add image of the website */}
                  </Box>
                  <Box mt={1}>
                    <Typography variant='h3' color='primary'>
                      GameFace
                    </Typography>
                  </Box>
                </Box>
              </Link>
              <p className='footer-text'>
                <Box maxWidth="420px" mb={3}>
                    The GameFace is a website dedicated to help consumers identify 
                    good games currently on the market and see what games other people 
                    like.
                </Box>
                <Box display='flex'>
                  <a href='https://www.instagram.com'>
                  {/* <InstagramIcon fontSize='large' /> */}
                  </a>
                </Box>
                <Box mt={1}>
                  © GameFace - 2021
                </Box>
              </p>
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
