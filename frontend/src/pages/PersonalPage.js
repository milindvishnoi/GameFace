import React, { Component } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './PersonalPage.css';

// Inspired by (URL)
export class PersonalPage extends Component {
  state={
    email: '',
    emailError: false,
    emailErrorMessage: ''
  }

  validate = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let reg = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(value)
    console.log(reg)
    reg ? this.setState({
        [name]: value,
        emailErrorMessage: "",
        error: false
      }) : this.setState({
        [name]: value,
        emailErrorMessage: "Please fill in a valid email.",
        error: true
      })
  }

  render() {
    const { logout } = this.props

    return (
        <Box>
            <Box>
              <img 
                className='personal-picture'
                src={process.env.PUBLIC_URL + 'gamepad.svg'} />
            </Box>
          <Typography variant="h5">
            @username
          </Typography>
          <Typography variant="h5">
            This is a bio
          </Typography>
          <Link to='/'>
            <Button onClick={ logout }>Logout</Button>
          </Link>
        </Box>
    )
  }
}

export default PersonalPage
