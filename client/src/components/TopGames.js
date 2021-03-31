import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, Grid } from '@material-ui/core'
import './topGames.css'
import { Link } from 'react-router-dom'

export default class TopGames extends Component {
  static propTypes = {
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    link: PropTypes.string,
    gameIndex: PropTypes.number
  }

  render() {
    const {title, imgSrc, link, gameIndex} = this.props
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Link to={link}>
          <ButtonBase
            focusRipple
            key={title}
            className="button-transition"
          >
            <img 
              className="image" 
              src={process.env.PUBLIC_URL + imgSrc}
              alt={title + "'s Image Button"} 
              />
            <span
              className="title-container"
            >
              {gameIndex + 1}. {title}
            </span>
          </ButtonBase>
        </Link>
      </Grid>
    )
  }
}
