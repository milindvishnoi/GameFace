import { Container } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'


export class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path='/' render={ () => <Home />} />
          <Route exact path='/login' render={ () => <LoginPage />} />
        </Switch>
      </Container>
    )
  }
}

export default App;
