import React, { Component } from 'react'
import { InputBase } from '@material-ui/core'

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          /> 
      </div>
    )
  }
}

export default SearchBar
