import React from 'react';
import MenuBar from '../components/MenuBar'

import RestaurantSearchComplex from '../components/RestaurantSearchComplex';
import RestaurantCard from '../components/RestaurantCard';

import { 
  Center 
} from '@chakra-ui/react'

class RestaurantSearch extends React.Component {
  render() {
    return (
      <div>
        <MenuBar/>
        <RestaurantSearchComplex/>
        <Center>
          <RestaurantCard/>
        </Center>
      </div>
    )
  }

}
export default RestaurantSearch