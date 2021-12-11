import React from 'react';
import MenuBar from '../components/MenuBar'
import Hero from '../components/Hero'
import StatCard from '../components/StatCard'
import AirbnbCard from '../components/AirbnbCard';

import { Center, Box } from '@chakra-ui/react'

class HomePage extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div>
        {/* Define menu bar code here */}
        <MenuBar />
        <Hero />
        <Center >
          <StatCard />
          <StatCard />
          <StatCard />
        </Center>
      </div>
    )
  }

}
export default HomePage