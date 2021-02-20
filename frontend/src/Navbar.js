import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Container, Link } from '@material-ui/core'
import { SearchBar } from './components/SearchBar'
import Box from '@material-ui/core/Box';
import LoginButton from './components/LoginButton';

export default class Navbar extends Component {
  render() {
    return (
      <AppBar position='static' color="primary">
        <Container>
          <Toolbar>
            <Link href='/' color="inherit" underline="none">
              <Typography variant="h6" noWrap color="inherit">
                Website Name
              </Typography>
            </Link>
            <Box mx='auto'>
              <SearchBar ml='auto' />
            </Box>
            <Box ml="auto">
              <LoginButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}
