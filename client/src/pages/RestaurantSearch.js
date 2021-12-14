import React from 'react';
import MenuBar from '../components/MenuBar'

import RestaurantSearchComplex from '../components/RestaurantSearchComplex';

class RestaurantSearch extends React.Component {
  render() {
    return (
      <div>
        <MenuBar />
        <RestaurantSearchComplex />
      </div>
    )
  }

}
export default RestaurantSearch