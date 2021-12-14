import React from 'react';
import MenuBar from '../components/MenuBar'
import ZipCodeStats from '../components/ZipCodeStats'

import { Center } from '@chakra-ui/react'

class Statistics extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />
        <Center>
          <ZipCodeStats />
        </Center>
      </div>
    )
  }

}
export default Statistics