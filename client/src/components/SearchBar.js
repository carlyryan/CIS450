import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box
} from '@chakra-ui/react'

import {
  StarIcon
} from '@chakra-ui/icons';

import React from 'react'

class SearchBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchQuery: ""
    }

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.handleSearch = () => { console.log("search") }
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value })
  }
  render() {
    return (
      <Box m={3} >
        <InputGroup size='md' >
          <Input
            pr='4.5rem'
            placeholder='Search Airbnbs'
            onChange={this.handleSearchQueryChange}
          />
          <InputRightElement width='4.5rem' p={2}>
            <Button h='1.75rem' size='sm' onClick={this.handleSearch}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    )
  }
}

export default SearchBar