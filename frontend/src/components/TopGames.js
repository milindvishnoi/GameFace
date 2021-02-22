import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, Grid, Typography } from '@material-ui/core'
import './topGame.css'

export default class TopGames extends Component {
  static propTypes = {
    name: Text,
    imgSrc: Text
  }

  render() {
    return (
      <Grid item xs={12} sm={6}>
        <ButtonBase
          focusRipple
          key={this.props.name}
          className="image"
        >
          <image 
            src={this.props.imgSrc}
            className="imageScr"
            />
        </ButtonBase>
        
        <Typography variant="h5">{this.props.name}</Typography>
      </Grid>
    )
  }
}
