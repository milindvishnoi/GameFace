import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, Grid, Typography } from '@material-ui/core'
import './topGames.css'

export default class TopGames extends Component {
  static propTypes = {
    name: PropTypes.string,
    imgSrc: PropTypes.string
  }

  render() {
    const {name, imgSrc} = this.props
    return (
      <Grid item xs={12} sm={6}>
        <ButtonBase
          focusRipple
          key={name}
        >
          <img className="image" src={process.env.PUBLIC_URL + imgSrc} />
          <Typography variant="h5">{name}</Typography>
        </ButtonBase>
      </Grid>
    )
  }
}
