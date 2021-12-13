import {
  Icon,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react'

import {
  ArrowUpIcon,
  CloseIcon,
  StarIcon
} from '@chakra-ui/icons';

import {
  FaBuilding,
  FaCar,
  FaChair,
  FaChild,
  FaDog,
  FaHeart,
  FaMap,
  FaPeopleArrows,
  FaPhone,
  FaTrash,
  FaWineGlass
} from 'react-icons/fa'

import {
  BiAccessibility,
  BiDrink,
  BiHappy
} from 'react-icons/bi'

import {
  GiBowTie,
  GiFlipFlops,
  GiHighHeel,
  GiLovers
} from 'react-icons/gi'

import {
  ImHipster
} from 'react-icons/im'

import {
    getRestaurant
} from '../fetcher.js'

import React from 'react'

class RestaurantCardDetailed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        image_url: "https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
        business_id: "__9DAJrvV7WQd20kr90HLQ",
        name: "H-E-B",
        address: "6001 W Parmer Ln",
        postal_code: 78727,
        stars: 3,
        review_count: 100,
        restaurant_price_range: 5,
        reservation_only: 1, 
        dogs_allowed: 1,
        restaurant_delivers: 1,
        wheelchair_accessible: 1,
        restaurant_good_for_groups: 1,
        outdoor_seating: 1,
        good_for_kids: 1,
        happy_hour: 1,
        alcohol: 1,
        mon_hours: "12:30-17:30",
        tue_hours: "12:30-17:30",
        wed_hours: "12:30-17:30",
        thu_hours: "12:30-17:30",
        fri_hours: "12:30-17:30",
        sat_hours: "12:30-17:30",
        sun_hours: "12:30-17:30",
        romantic: 1,
        intimate: 1,
        classy: 1,
        hipster: 1,
        divey: 1, 
        touristy: 1,
        trendy: 1,
        upscale: 1,
        casual: 1,
        full_bar: 1 
    };
  }

  render() {
    return (
        <div>
          <Table
            size='lg'
          >
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Td>{this.state.name}</Td>
              </Tr>

              <Tr>
                <Td>Address</Td>
                <Td>{this.state.address}</Td>
              </Tr>

              <Tr>
                <Td>Postal Code</Td>
                <Td>{this.state.postal_code}</Td>
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
                          color={i < this.state.stars ? 'teal.500' : 'gray.300'}
                        />
                        )
                      )
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Reviews</Td>
                <Td>{this.state.review_count}</Td>
              </Tr>

              <Tr>
                <Td>Price</Td>
                <Td>
                  {
                    Array(5)
                      .fill('')
                      .map((_, i) => (
                        <ArrowUpIcon
                          key={i}
                          color={i < this.state.restaurant_price_range ? 'teal.500' : 'gray.300'}
                        />
                        )
                      )
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Monday</Td>
                <Td>{this.state.mon_hours}</Td>
              </Tr>

              <Tr>
                <Td>Tuesday</Td>
                <Td>{this.state.tue_hours}</Td>
              </Tr>

              <Tr>
                <Td>Wednesday</Td>
                <Td>{this.state.wed_hours}</Td>
              </Tr>

              <Tr>
                <Td>Thursday</Td>
                <Td>{this.state.thu_hours}</Td>
              </Tr>

              <Tr>
                <Td>Friday</Td>
                <Td>{this.state.fri_hours}</Td>
              </Tr>

              <Tr>
                <Td>Saturday</Td>
                <Td>{this.state.sat_hours}</Td>
              </Tr>

              <Tr>
                <Td>Sunday</Td>
                <Td>{this.state.sun_hours}</Td>
              </Tr>

              <Tr>
                <Td>Alcohol</Td>
                <Td>
                  {
                    this.state.alcohol
                    ? <Icon as={BiDrink} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

               <Tr>
                <Td>Casual</Td>
                <Td>
                  {
                    this.state.casual
                    ? <Icon as={GiFlipFlops} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Classy</Td>
                <Td>
                  {
                    this.state.classy
                    ? <Icon as={GiBowTie} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Delivery</Td>
                <Td>
                  {
                    this.state.restaurant_delivers
                    ? <Icon as={FaCar} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Divey</Td>
                <Td>
                  {
                    this.state.divey
                    ? <Icon as={FaTrash} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

               <Tr>
                <Td>Dogs Allowed</Td>
                <Td>
                  {
                    this.state.dogs_allowed
                    ? <Icon as={FaDog} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Full Bar</Td>
                <Td>
                  {
                    this.state.full_bar
                    ? <Icon as={FaWineGlass} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Good for Groups</Td>
                <Td>
                  {
                    this.state.restaurant_good_for_groups
                    ? <Icon as={FaPeopleArrows} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Good for Kids</Td>
                <Td>
                  {
                    this.state.good_for_kids
                    ? <Icon as={FaChild} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Happy Hour</Td>
                <Td>
                  {
                    this.state.happy_hour
                    ? <Icon as={BiHappy} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Hipster</Td>
                <Td>
                  {
                    this.state.hipster
                    ? <Icon as={ImHipster} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Intimate</Td>
                <Td>
                  {
                    this.state.intimate
                    ? <Icon as={GiLovers} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Outdoor Seating</Td>
                <Td>
                  {
                    this.state.outdoor_seating
                    ? <Icon as={FaChair} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Reservation Only</Td>
                <Td>
                  {
                    this.state.reservation_only
                    ? <Icon as={FaPhone} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Romantic</Td>
                <Td>
                  {
                    this.state.romantic
                    ? <Icon as={FaHeart} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Touristy</Td>
                <Td>
                  {
                    this.state.touristy
                    ? <Icon as={FaMap} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Trendy</Td>
                <Td>
                  {
                    this.state.trendy
                    ? <Icon as={GiHighHeel} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Upscale</Td>
                <Td>
                  {
                    this.state.upscale
                    ? <Icon as={FaBuilding} color={'teal.500'}/>
                    : <CloseIcon color={'gray.300'}/>
                  }
                </Td>
              </Tr>

              <Tr>
                <Td>Wheelchair Accessible</Td>
                <Td>
                  {
                    this.state.wheelchair_accessible
                    ? <Icon as={BiAccessibility} color={'teal.500'}/>
                    : <Icon as={BiAccessibility} color={'gray.300'}/>
                  }
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
    );
  }
}

export default RestaurantCardDetailed
