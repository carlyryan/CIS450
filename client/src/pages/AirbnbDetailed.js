import React from 'react';
import AirbnbCardDetailed from '../components/AirbnbCardDetailed';
import MenuBar from '../components/MenuBar'

import {
  Center
} from '@chakra-ui/react'

class AirbnbDetailed extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />
        <Center>
          <AirbnbCardDetailed />
        </Center>
      </div>
    )
  }

}
export default AirbnbDetailed