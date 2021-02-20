import { Button } from '@material-ui/core'
import React, { Component } from 'react'

export class LoginButton extends Component {
  state = {
    login: false
  }

  render() {
    return (
      <div>
        { this.state.login ?
          <div></div> : <Button>Login</Button>
        }
      </div>
    )
  }
}

export default LoginButton
