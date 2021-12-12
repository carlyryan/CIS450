
import {
  Box,
  SimpleGrid
} from '@chakra-ui/react'

import {
  StarIcon
} from '@chakra-ui/icons';

import React from 'react'
import AirbnbCard from './AirbnbCard';


const card_example = {
  imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4,
}

const sample_cards = []

class AirbnbSearchResults extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      results: sample_cards
    }

  }

  render() {
    return (
      <SimpleGrid columns={3} spacing={10}>
        <AirbnbCard />
        <AirbnbCard />
        <AirbnbCard />
        <AirbnbCard />
        <AirbnbCard />
      </SimpleGrid>
    )
  }
}

export default AirbnbSearchResults