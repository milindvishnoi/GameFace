import { Container, CssBaseline } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import PersonalPage from './pages/PersonalPage'
import AdminPage from './pages/AdminPage'
import UserPage from './pages/UserPage'
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme'
import Navbar from './components/global/header/Navbar';
import Footer from './components/global/footer/Footer';
import './App.css'
import { games } from './data'


export class App extends Component {
  state = {
    darkMode: true,
    adminLogin: false,
    userLogin: true,
    userInfo: null
  }

  toggleTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
    console.log(this.state.darkMode)
  }

  login = (username, password) => {
    /* siteAdmin */ 
    if (username === 'admin1@admin.com' && password === 'admin1') 
      this.setState({
        adminLogin: true,
        userLogin: false
      })
    /* gameAdmin */
    else if (username === 'admin2@admin.com' && password === 'admin2') 
      this.setState({
        adminLogin: true,
        userLogin: false
      })
    else if (username === 'user@user.com' && password === 'user') {
      this.setState({
        userLogin: true,
        adminLogin: false
      })
      return;
    }
  }

  logout = () => {
    this.setState({
      userLogin: false,
      adminLogin: false
    })
    console.log(this.state.userLogin, this.state.adminLogin)
  }

  render() {
    const { darkMode, adminLogin, userLogin } = this.state

    return (
      <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
        <CssBaseline>
          <Navbar 
            adminLogin={ adminLogin }
            userLogin={ userLogin }
            currentTheme={ darkMode } 
            toggleTheme={ this.toggleTheme }
            logout={ this.logout } />
            <Container>
              <Switch>
              <Route exact path='/games/:gameTitle' render={ ({ match }) => (<Game
                                                                        userLoggedIn={this.state.userLogin}  
                                                                        displayGame={games.find(g => 
                                                                          '/games/'.concat(match.params.gameTitle) === g.link
                                                                        )}
                                                                        gameAdminLoggedIn={this.state.adminLogin} 
                                                                        siteAdminLoggedIn={this.state.adminLogin}/>) } />
                {/* <Route exact path='/games/nba2k22' render={ () => <Game userLoggedIn={this.state.userLogin}  
                                                                        gameAdminLoggedIn={this.state.adminLogin} 
                                                                        siteAdminLoggedIn={this.state.adminLogin}/> } /> */}
                <Route exact path='/' render={ () => <Home /> } />
                <Route exact path='/login' render={ () => <LoginPage 
                                                            login={ this.login }
                                                             /> } />
                <Route exact path='/signup' render={ () => <SignUpPage /> } />
                <Route exact path='/personal' render={ () => <PersonalPage
                                                              siteAdminLoggedIn={this.state.adminLogin}
                                                              
                                                              logout={ this.logout } /> } />     
                <Route exact path='/admin' render={ () => <AdminPage
                                                              gameAdminLoggedIn={this.state.adminLogin}
                                                              siteAdminLoggedIn={this.state.adminLogin}
                                                              logout={ this.logout } /> } />                                      
                <Route exact path='/user' render={ () => <UserPage
                                                              userLoggedIn={this.state.userLogin} 
                                                              gameAdminLoggedIn={this.state.adminLogin} 
                                                              siteAdminLoggedIn={this.state.adminLogin} 
                                                              logout={ this.logout } /> } />
              </Switch>
            </Container>
          <Footer />
        </CssBaseline>
      </ThemeProvider>
    )
  }
}

export default App;
