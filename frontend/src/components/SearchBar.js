import React, { Component } from 'react'
import { List, ListItem, ListItemText, TextField, Box, Button } from '@material-ui/core'
import AutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import './searchBar.css'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: game => game.name,
});

export class SearchBar extends Component {
  state = {
      games: [
        { 
          name: 'NBA 2K22', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: '/games/nba2k22'
        },
        { 
          name: 'Fifa 2021', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: '/games/fifa2021'
        },
        { 
          name: 'Underdog', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: '/games/ud'
        },
        { 
          name: 'Asphault', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: '/games/asphault'
        },
      ],
      searchField : '',
      searchedGame: [],
      displaySearch: false,
      currentLink: null
  }

  handleSearch = (event) => {
    const value = event.target.value
    console.log(value)

    const searchedGames = value !== '' ? 
    this.state.games.filter(game => 
      game.name.toLowerCase().includes(value.toLowerCase())
    ) : []
    console.log(searchedGames)

    this.setState({
      searchedGame: searchedGames,
      searchField: value
    })
  }

  hideSuggestions = () => {
    this.setState({
      displaySearch: true
    })
  }

  showSuggestions = () => {
    this.setState({
      displaySearch: false
    })
  }

  render() {
    return (
      <div className='relative-pos'>
          <Box mr={3}>
            <AutoComplete
              className='bar'
              id='search-bar'
              clearOnBlur
              options={this.state.games}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Games"
                  margin="normal"
                  variant="outlined"
                />
              )}
              getOptionLabel={(game) => game.name}
              renderOption={(game) => (<div className='link'><Box w={100}>{game.name}</Box></div>)}
              onChange={(e, value, reason) => { 
                reason === 'select-option' ?
                this.setState({
                  currentLink: value.link
                }) : this.setState({
                  currentLink: null
                })
                }
              }
              closeIcon={null}
              noOptionsText='No more games!'
            />
          </Box>

            {
              this.state.currentLink !== null ?
              <Link to={this.state.currentLink}>
                <Button  
                  startIcon={<SearchIcon />}
                  >
                  Search!
                </Button>
              </Link> : 
              <Button 
                startIcon={<SearchIcon />}
                disabled>
                Search!
              </Button>
            }



            {/* <input type='text'
                   placeholder='Search Games...'
                   onKeyUp={this.handleSearch}
                   onBlur={hideSuggestions}
                   onFocus={showSuggestions}
                   />
            
            <ul className='search-suggestions'>
              {(!this.state.displaySearch && this.state.searchedGame.map((game, index) => {
                return (
                  <li key={index} className={focusIndex === index ? 'active-search' : null}>
                    <Link href={`/${game.link}`} underline='none' color='inherit' variant='body1'>
                      {game.name}
                    </Link>
                  </li>
                )
                }))}
            </ul> */}

          {/* <input type='text'
                 className='bar'
                 placeholder='Search Games...'
                 onKeyUp={this.handleSearch}
                />
        
        {this.state.searchedGame.length !== 0 ? 
        <List className='search-results-container absolute'>
          {this.state.searchedGame.map(game => {
            return (
              <ListItem button to={game.link} key={game.name}>
                <Link to={`/${game.link}`}>
                  <ListItemText>{ game.name }</ListItemText>
                </Link>
              </ListItem>
            )
            })}
        </List> : null */}
        
      </div>
    )
  }
}

export default SearchBar
