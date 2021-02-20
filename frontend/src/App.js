import { Container } from '@material-ui/core'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'


export class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path='/' render={ () => <Home />} />
          </Switch>
        </Router>
      </Container>
    )
  }
}

export default App;
