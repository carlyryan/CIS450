import React from 'react';
import MenuBar from '../components/MenuBar'
import SearchBar from '../components/SearchBar'
import { Center } from '@chakra-ui/react'
import AirbnbSearchResults from '../components/AirbnbSearchResults';

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
        <Center m={10}>
          <AirbnbSearchResults />
        </Center>
      </div>
    )
  }

}
export default AirbnbSearch