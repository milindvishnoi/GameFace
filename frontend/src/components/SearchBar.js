import React, { Component } from 'react'
import { TextField, List, Box, ListItem, ListItemText } from '@material-ui/core'
import AutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import './searchBar.css'
import { Link } from 'react-router-dom';

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
          link: 'nba2k22'
        },
        { 
          name: 'Fifa 2021', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'fifa2021'
        },
        { 
          name: 'Underdog', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'ud'
        },
        { 
          name: 'Asphault', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'asphault'
        },
      ],
      searchField : '',
      searchedGame: [],
      displaySearch: false,
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
          {/* <AutoComplete
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
              loading
              getOptionLabel={(game) => game.name}
              renderOption={(game) => (<div className='link'><Box w={100}>{game.name}</Box></div>)}
            /> */}

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

          <input type='text'
                 className='bar'
                 placeholder='Search Games...'
                 onKeyUp={this.handleSearch}
                />
        
        {this.state.searchedGame.length !== 0 ? 
        <List className='search-results-container absolute'>
          {this.state.searchedGame.map(game => {
            return (
              <ListItem button to={game.link} key={game.name}>
                <Link href={`/${game.link}`} underline='none' color='inherit' variant='body1'>
                  <ListItemText>{ game.name }</ListItemText>
                </Link>
              </ListItem>
            )
            })}
        </List> : null
        }
      </div>
    )
  }
}

export default SearchBar
