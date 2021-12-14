import React from 'react';

import MenuBar from '../components/MenuBar'

import Hero from '../components/Hero'

import StatCard from '../components/StatCard'

import {
  Center
} from '@chakra-ui/react'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <MenuBar />

        <Hero />

        <Center >
          <StatCard />
          <StatCard />
          <StatCard />
        </Center>
      </div>
    );
  }

}

export default HomePage