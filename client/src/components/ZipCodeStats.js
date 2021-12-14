import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
  Heading
} from '@chakra-ui/react'


import { getZipCodeInfo } from '../fetcher'


class ZipCodeStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: [],
      rating: [],
      most_options: []
    }
  }

  componentDidMount() {
    getZipCodeInfo().then((res) => {
      this.setState({
        price: res[2].results,
        rating: res[1].results,
        most_options: res[0].results
      }, () => {
        console.log(this.state);
      });
    })
  }

  render() {
    return (
      <div>
        <Heading m={6}> Best Priced Neighborhoods</Heading>
        <Table size={'lg'}>
          <Thead>
            <Tr>
              <Th>Zip Code</Th>
              <Th>Average Price of an Airbnb</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Array(this.state.price.length < 5 ? this.state.price.length : 5)
                .fill('')
                .map((_, i) => {
                  return (
                    <Tr key={i} >
                      <Td>{this.state.price[i].postal_code}</Td>
                      <Td>{this.state.price[i].criterion}</Td>
                    </Tr>)
                })
            }
          </Tbody>
        </Table>

        <Heading m={6}> Best Rated Neighborhoods:</Heading>

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Zip Code</Th>
              <Th>Avg Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Array(this.state.rating.length < 5 ? this.state.rating.length : 5)
                .fill('')
                .map((_, i) => {
                  return (
                    <Tr key={i} >
                      <Td>{this.state.rating[i].postal_code}</Td>
                      <Td>{this.state.rating[i].criterion}</Td>
                    </Tr>)
                })
            }
          </Tbody>
        </Table>

        <Heading m={6}> Most Dense Neighborhood:</Heading>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Zip Code</Th>
              <Th># of Airbnbs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              Array(this.state.most_options.length < 5 ? this.state.most_options.length : 5)
                .fill('')
                .map((_, i) => {
                  return (
                    <Tr key={i} >
                      <Td>{this.state.most_options[i].postal_code}</Td>
                      <Td>{this.state.most_options[i].criterion}</Td>
                    </Tr>)
                })
            }
          </Tbody>
        </Table>
      </div>
    )
  }

}

export default ZipCodeStats