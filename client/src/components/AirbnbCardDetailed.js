import {
  Box,
  Center,
  Link,
  Table,
  Tbody,
  Tr,
  Td,
  Image
} from '@chakra-ui/react'

import {
  StarIcon
} from '@chakra-ui/icons'

import {
  getAirbnb
} from '../fetcher.js'

import React from 'react'

class AirbnbCardDetailed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      res: {}
    };
  }

  componentDidMount() {
    let url = window.location.href.split("/");
    
    getAirbnb(url[url.length - 1]).then(res => {
      this.setState(prevState => ({
        res: res.results[0]
      }));
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <Center m={10}>
          <Box w={400}>
            <Image src={this.state.res.picture_url} />
          </Box>
        </Center>
        <Table
          size='lg'
        >
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>{this.state.res.name}</Td>
            </Tr>
            <Tr>
              <Td>Listing URL</Td>
              <Td>
                <Link
                  href={this.state.res.listing_url}
                  isExternal
                >
                  {this.state.res.listing_url}
                </Link>
              </Td>
            </Tr>

            <Tr>
              <Td>Description</Td>
              <Td>{this.state.res.description}</Td>
            </Tr>

            <Tr>
              <Td>Neighborhood</Td>
              <Td>{this.state.res.neighborhood_overview}</Td>
            </Tr>

            <Tr>
              <Td>Picture URL</Td>
              <Td>
                <Link
                  href={this.state.res.picture_url}
                  isExternal
                >
                  {this.state.res.picture_url}
                </Link>
              </Td>
            </Tr>

            <Tr>
              <Td>Postal Code</Td>
              <Td>{this.state.res.postal_code}</Td>
            </Tr>

            <Tr>
              <Td>Latitude</Td>
              <Td>{this.state.res.latitude}</Td>
            </Tr>

            <Tr>
              <Td>Longitude</Td>
              <Td>{this.state.res.longitude}</Td>
            </Tr>

            <Tr>
              <Td>Room type</Td>
              <Td>{this.state.res.room_type}</Td>
            </Tr>

            <Tr>
              <Td>Bedrooms</Td>
              <Td>{this.state.res.bedrooms}</Td>
            </Tr>

            <Tr>
              <Td>Beds</Td>
              <Td>{this.state.res.beds}</Td>
            </Tr>

            <Tr>
              <Td>Bathrooms</Td>
              <Td>{this.state.res.bathrooms}</Td>
            </Tr>

            <Tr>
              <Td>Price</Td>
              <Td>{this.state.res.price}</Td>
            </Tr>

            <Tr>
              <Td>Nights</Td>
              <Td>{this.state.res.minimum_nights}-{this.state.res.maximum_nights}</Td>
            </Tr>

            <Tr>
              <Td>Stars</Td>
              <Td>
                {
                  Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < this.state.res.review_scores_rating ? 'teal.500' : 'gray.300'}
                      />
                    )
                    )
                }
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    );
  }
}

export default AirbnbCardDetailed
