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

class RestaurantSearchBar extends React.Component {

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
      <Box mx="20%" my={3}>
        <InputGroup size='lg'>
          <Input
            pr='4.5rem'
            placeholder='Search Restaurants'
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

export default RestaurantSearchBar