import { Box, Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './grid.css';

export class Grid1x3 extends Component {
  render() {
    return (
      <Grid container>
        {console.log(this.props.gridObject)}
        { 
          this.props.gridObject.length > 0 ?
          this.props.gridObject.map((object) => {
            return (
              <GridItem 
                key={object.title}
                imgSrc={object.imgSrc}
                title={object.title}
                desc ={object.desc} />
              )
          }) : <p>Not working</p>
        }
      </Grid>
    )
  }
}

class GridItem extends Component {
  render() {
    return (
      <Grid item xs={4}>
        <Box 
          display='flex' 
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          mb={8}>
            <Box mb={4}>
            <img
              className='image-container'
              src={ process.env.PUBLIC_URL + this.props.imgSrc}
              alt={this.props.imgSrc + "'s Image"}
              />
            </Box>
            <Box mb={2}>
              <Typography align='center' variant='h4' color='primary'>
                { this.props.title }
              </Typography>
            </Box>
            <Typography variant='body1' align='center'>
              { this.props.desc }
            </Typography>
        </Box>
      </Grid>
    )}
}

export default Grid1x3
