import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Container, Link, Switch } from '@material-ui/core'
import { SearchBar } from '../../SearchBar'
import Box from '@material-ui/core/Box';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { LoginButton }from '../../LoginButton';
import './navbar.css';


export default class Navbar extends Component {
  render() {
    return (
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Link href='/' color="inherit" underline="none">
              <Box display='flex'>
                <Box mr={1}>
                  <img 
                    className="logo" 
                    src={process.env.PUBLIC_URL + '/gamepad.svg'}
                    alt="Company's Logo" 
                    />
                </Box>

                <Typography 
                  variant="h4" 
                  noWrap 
                  >
                  GameFace
                </Typography>
              </Box>
            </Link>

            <Box mx='auto'>
              <SearchBar ml='auto' />
            </Box>

            <Box ml="auto" display='flex'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Brightness5Icon />
                  <Switch 
                    color='inherit'
                    checked={this.props.currentTheme}
                    onChange={this.props.toggleTheme} />
                <Brightness4Icon />
              </Box>
              <LoginButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}
