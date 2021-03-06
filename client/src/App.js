import { Container, CssBaseline } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme'
import Navbar from './components/global/header/Navbar';
import Footer from './components/global/footer/Footer';
import './App.css'
import {login, logout, updateUserInfo} from './actions/user'
import {getAllGames} from './actions/games'
import NewGame from './pages/NewGame'
import {checkSession} from './actions/user'


export class App extends Component {
  state = {
    darkMode: true,
    adminLogin: false,
    userLogin: false,
    currUser: null, 
    userInfo: null,
    gameList: []
  }

  componentDidMount() {
    getAllGames(this)
    checkSession(this) 
  }

  toggleTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
    console.log(this.state.darkMode)
  }

  appLogin = (username, password) => {
    login(username, password, this);
  }
  
  appLogout = () => {
    logout(this);
  }

  appUpdate = (field, value) => {
    updateUserInfo(this, this.state.currUser._id, field, value); 
  }

  render() {
    const { darkMode, adminLogin, currUser } = this.state

    return (
      <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
        <CssBaseline>
          <Navbar 
            adminLogin={ adminLogin }
            user={ currUser }
            currentTheme={ darkMode } 
            toggleTheme={ this.toggleTheme }
            logout={ this.appLogout } />
            <Container>
              <Switch>
              <Route exact path='/games/:id' render={ ({ match }) => (<Game
                                                                        userLoggedIn={this.state.userLogin}  
                                                                        currUser={currUser}
                                                                        match={match}
                                                                        gameAdminLoggedIn={this.state.adminLogin} 
                                                                        siteAdminLoggedIn={this.state.adminLogin}/>) } />
                <Route exact path='/' render={ () => <Home /> } />
                <Route exact path='/login' render={ () => <LoginPage 
                                                            login={ this.appLogin }
                                                             /> } />
                <Route exact path='/signup' render={ () => <SignUpPage /> } />
                {
                  currUser ? 
                    <Route exact path='/personal' render={ () => <UserPage
                      user={currUser}
                      userLoggedIn={this.state.userLogin} 
                      gameAdminLoggedIn={this.state.adminLogin} 
                      siteAdminLoggedIn={this.state.adminLogin} 
                      logout={ this.appLogout }
                      updateInfo={ this.appUpdate } /> } /> : null
                }
                {
                  adminLogin ? 
                    <Route exact path='/admin' render={ () => <AdminPage
                      gameAdminLoggedIn={this.state.adminLogin}
                      siteAdminLoggedIn={this.state.adminLogin}
                      logout={ this.appLogout } /> } />  : null  
                }
                {
                  adminLogin ?
                  <Route exact path='/create-new-game' render={() => <NewGame />} /> : null
                }
              </Switch>
            </Container>
          <Footer />
        </CssBaseline>
      </ThemeProvider>
    )
  }
}

export default App;
