import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Container, Link, Switch } from '@material-ui/core'
import { SearchBar } from '../../SearchBar'
import Box from '@material-ui/core/Box';
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

            <Switch 
              checked={this.props.theme}
              onChange={this.props.toggleTheme} />

            <Box ml="auto">
              <LoginButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}
