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
          <StatCard heading={`Austin's cheapest Airbnb's are in ${this.state.cheapest_zip}`} body={`Austin is known for it's cheap and afforable housing. But when taken into account with surrounding food prices of nearby restaurants, the ${this.state.cheapest_zip} zip code stands out with $${this.state.price_index} nightly stay.`} />
          <StatCard heading={`Austin's most popular Mexican restaurant is ${this.state.category}`}
            body={`Austin has a lot of diverse restaurant categories. But one thing it's particularly known for is it's Mexican food. Austin's most popular Mexican offering is ${this.state.category} with over ${this.state.category_num_results} joints all over the city.`} />
        </Center>
      </div>
    );
  }
}

export default HomePage