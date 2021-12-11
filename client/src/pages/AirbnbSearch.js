import React from 'react';
import MenuBar from '../components/MenuBar'
import SearchBar from '../components/SearchBar'
import { Center } from '@chakra-ui/react'

class AirbnbSearch extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />

        <SearchBar />
        Airbnbs
      </div>
    )
  }

}
export default AirbnbSearch