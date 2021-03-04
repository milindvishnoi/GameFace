import React, { Component } from 'react'
import { TextField, Typography } from '@material-ui/core'
import AutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import { Link } from 'react-router-dom'
import './searchBar.css'
import { Link } from 'react-router-dom';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: game => game.name,
});

export class SearchBar extends Component {
  state = {
      games: [
        { name: 'NBA 2K22', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'nba2k22'
        },
        { name: 'Fifa 2021', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'fifa2021'
        },
        { name: 'Underdog', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'ud'
        },
        { name: 'Asphault', 
          imgSrc: '/topGames/nba2k22.jpg',
          link: 'asphault'
        },
      ],
      searchField : '',
      searchedGame: []
  }

  // handleSearch = (event) => {
  //   const value = event.target.value
  //   console.log(value)

  //   const searchedGames = value !== '' ? 
  //   this.state.games.filter(game => 
  //     game.name.toLowerCase().includes(value.toLowerCase())
  //   ) : []
  //   console.log(searchedGames)

  //   this.setState({
  //     searchedGame: searchedGames,
  //     searchField: value
  //   })
  // }

  render() {
    return (
      <div>
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
            />
        
        {/* {this.state.searchedGame.length !== 0 ? 
        <template className='search-results-container'>
          {this.state.searchedGame.map(game => {
            return (
              <ListItem button to={game.link} key={game.name}>
                <Link href={`/${game.link}`} underline='none' color='inherit' variant='body1'>
                  <ListItemText>{ game.name }</ListItemText>
                </Link>
              </ListItem>
            )
            })}
        </template> : null
        } */}
      </div>
    )
  }
}

export default SearchBar
