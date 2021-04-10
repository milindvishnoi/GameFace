import React, { Component } from 'react'
import { TextField, Box, Button } from '@material-ui/core'
import AutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import './searchBar.css'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { searchGame, getAllGames } from '../actions/games'

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: game => game.title,
});

export class SearchBar extends Component {
  state = {
      searchField: '',
      gameList: [],
      displaySearch: false,
      curr_id: null
  }

  componentDidMount() {
    getAllGames(this)
  }

  handleChange = (value) => {
    this.setState(
      {searchField: value}, 
      () => { searchGame(this) }
    )
  }

  render() {
    const {gameList} = this.state

    return (
      <div className='relative-pos'>
        <Box mr={3}>
          <AutoComplete
            className='bar'
            id='search-bar'
            clearOnBlur
            options={gameList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Games"
                margin="normal"
                variant="outlined"
              />
            )}
            getOptionLabel={(game) => game.title}
            renderOption={(game) => (<div className='link'><Box w={100}>{game.title}</Box></div>)}
            onChange={(e, value, reason) => { 
              reason === 'select-option' ?
              this.setState({
                curr_id: value._id
              }) : this.setState({
                curr_id: null
              })
              }
            }
            onInputChange={(e, value) => {
              this.setState(
                {searchField: value}, 
                () => { searchGame(this) }
              )
            }}
            popupIcon={null}
            noOptionsText='No more games!'
          />
        </Box>

        {
          this.state.curr_id !== null ?
          <Link to={`/games/${this.state.curr_id}`}>
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
      </div>
    )
  }
}

export default SearchBar