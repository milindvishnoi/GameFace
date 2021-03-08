import { Container, CssBaseline } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme'
import Navbar from './components/global/header/Navbar';
import Footer from './components/global/footer/Footer';

export class App extends Component {
  state = {
    darkMode: true
  }

  toggleTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
    console.log(this.state.darkMode)
  }

  render() {
    const { darkMode } = this.state

    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline>
          <Navbar currentTheme={darkMode} toggleTheme={this.toggleTheme} />
            <Container>
              <Switch>
                <Route exact path='/' render={ () => <Home />} />
                <Route exact path='/login' render={ () => <LoginPage />} />
                <Route exact path='/signup' render={ () => <SignUpPage />} />
              </Switch>
            </Container>
          <Footer />
        </CssBaseline>
      </ThemeProvider>
    )
  }
}

export default App;
