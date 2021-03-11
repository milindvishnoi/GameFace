import React, { Component } from 'react'
import { List, ListItem, ListItemText, TextField, Box, Button } from '@material-ui/core'
import AutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import './searchBar.css'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { games } from '../data'

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: game => game.title,
});

export class SearchBar extends Component {
  state = {
      searchField : '',
      searchedGame: [],
      displaySearch: false,
      currentLink: null
  }

  render() {
    return (
      <div className='relative-pos'>
        <Box mr={3}>
          <AutoComplete
            className='bar'
            id='search-bar'
            clearOnBlur
            options={games}
            filterOptions={filterOptions}
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
                currentLink: value.link
              }) : this.setState({
                currentLink: null
              })
              }
            }
            popupIcon={null}
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
      </div>
    )
  }
}

export default SearchBar