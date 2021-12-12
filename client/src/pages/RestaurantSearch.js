import React from 'react';
import MenuBar from '../components/MenuBar'
import RestaurantSearchBar from '../components/RestaurantSearchBar';
import RestaurantCard from '../components/RestaurantCard';
import StatCard from '../components/StatCard';

import { Center } from '@chakra-ui/react'

class RestaurantSearch extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />

        <RestaurantSearchBar />

        <StatCard />
        <Center m={10}>
          <RestaurantCard />
        </Center>

      </div>
    )
  }

}
export default RestaurantSearch