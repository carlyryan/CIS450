import React from 'react';

import MenuBar from '../components/MenuBar'
import Hero from '../components/Hero'
import StatCard from '../components/StatCard'

import { getCheapestPostal, getMostPopularMexicanRestaurant } from '../fetcher';

import {
  Center
} from '@chakra-ui/react'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cheapest_zip: "",
      cheapest_zip_price: 100,
      category: "",
      category_num_results: 0
    }
  }

  componentDidMount() {
    getCheapestPostal().then((res) => {
      this.setState({
        cheapest_zip: res.results[0].postal_code,
        cheapest_zip_price: res.results[0].price_index
      })
    })

    getMostPopularMexicanRestaurant().then((res) => {
      this.setState({
        category: res.results[0].category,
        category_num_results: res.results[0].count
      })
    })
  }


  render() {
    return (
      <div>
        <MenuBar />

        <Hero />

        <Center >
          <StatCard 
            heading={`Most Afforable Area`} 
            body={`Austin, TX hasn't always been so expensive. The influx of industry giants like Apple, Google, and Tesla has ushered in a new era of prices. However, some neighborhoods have remained affordable. We used a combination of Airbnb and Yelp data to determine that ${this.state.cheapest_zip} is the place to be for those with a budget in mind.`}
          />

          <StatCard 
            heading={`Most Popular Cuisine`}
            body={`Austin, TX is known for having some of the most diverse food options in the country. With more than ${this.state.category_num_results} offerings across the city, ${this.state.category} sits at the top of the list.`}
          />
        </Center>
      </div>
    );
  }
}

export default HomePage