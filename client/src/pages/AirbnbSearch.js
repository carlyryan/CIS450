import React from 'react';
import MenuBar from '../components/MenuBar'
import AirbnbSearchBar from '../components/AirbnbSearchBar'
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
        <AirbnbSearchBar />
        <Center m={10}>
          <AirbnbSearchResults />
        </Center>
      </div>
    )
  }

}
export default AirbnbSearch