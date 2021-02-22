import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class LoginButton extends Component {
  state = {
    login: false
  }

  render() {
    return (
      <div>
        { this.state.login ?
          <div></div> : 
          <div>
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/signup"><Button>Sign up</Button></Link>
          </div>
        }
      </div>
    )
  }
}

export default LoginButton
