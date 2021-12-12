import React from 'react';
import MenuBar from '../components/MenuBar'
import RestaurantSearchBar from '../components/RestaurantSearchBar';

import { Center } from '@chakra-ui/react'

class RestaurantDetailed extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />
        <RestaurantSearchBar />
        <Center m={10}>
          {/* <AirbnbSearchResults /> */}
        </Center>
      </div>
    )
  }

}
export default RestaurantDetailed