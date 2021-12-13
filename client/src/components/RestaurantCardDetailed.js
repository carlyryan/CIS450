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
} from '@chakra-ui/icons'

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
            res: {

            }
        };
    }

    componentDidMount() {
        let url = window.location.href.split("/");

        getRestaurant(url[url.length - 1]).then(res => {
            this.setState(prevState => ({
                res: res.results[0]
            }));
        });
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
                    <Td>{this.state.res.name}</Td>
                  </Tr>

                  <Tr>
                    <Td>Address</Td>
                    <Td>{this.state.res.address}</Td>
                  </Tr>

                  <Tr>
                    <Td>Postal Code</Td>
                    <Td>{this.state.res.postal_code}</Td>
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
                              color={i < this.state.res.stars ? 'teal.500' : 'gray.300'}
                            />
                            )
                          )
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Reviews</Td>
                    <Td>{this.state.res.review_count}</Td>
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
                              color={i < this.state.res.restaurants_price_range2 ? 'teal.500' : 'gray.300'}
                            />
                            )
                          )
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Monday</Td>
                    <Td>{this.state.res.mon_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Tuesday</Td>
                    <Td>{this.state.res.tues_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Wednesday</Td>
                    <Td>{this.state.res.wed_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Thursday</Td>
                    <Td>{this.state.res.thurs_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Friday</Td>
                    <Td>{this.state.res.fri_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Saturday</Td>
                    <Td>{this.state.res.sat_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Sunday</Td>
                    <Td>{this.state.res.sun_hours}</Td>
                  </Tr>

                  <Tr>
                    <Td>Alcohol</Td>
                    <Td>
                      {
                        this.state.res.alcohol
                        ? <Icon as={BiDrink} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                   <Tr>
                    <Td>Casual</Td>
                    <Td>
                      {
                        this.state.res.casual
                        ? <Icon as={GiFlipFlops} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Classy</Td>
                    <Td>
                      {
                        this.state.res.classy
                        ? <Icon as={GiBowTie} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Delivery</Td>
                    <Td>
                      {
                        this.state.res.restaurants_delivery
                        ? <Icon as={FaCar} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Divey</Td>
                    <Td>
                      {
                        this.state.res.divey
                        ? <Icon as={FaTrash} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                   <Tr>
                    <Td>Dogs Allowed</Td>
                    <Td>
                      {
                        this.state.res.dogs_allowed
                        ? <Icon as={FaDog} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Full Bar</Td>
                    <Td>
                      {
                        this.state.res.full_bar
                        ? <Icon as={FaWineGlass} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Good for Groups</Td>
                    <Td>
                      {
                        this.state.res.restaurants_good_for_groups
                        ? <Icon as={FaPeopleArrows} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Good for Kids</Td>
                    <Td>
                      {
                        this.state.res.good_for_kids
                        ? <Icon as={FaChild} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Happy Hour</Td>
                    <Td>
                      {
                        this.state.res.happy_hour
                        ? <Icon as={BiHappy} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Hipster</Td>
                    <Td>
                      {
                        this.state.res.hipster
                        ? <Icon as={ImHipster} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Intimate</Td>
                    <Td>
                      {
                        this.state.res.intimate
                        ? <Icon as={GiLovers} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Outdoor Seating</Td>
                    <Td>
                      {
                        this.state.res.outdoor_seating
                        ? <Icon as={FaChair} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Reservation Only</Td>
                    <Td>
                      {
                        this.state.res.by_appointment_only
                        ? <Icon as={FaPhone} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Romantic</Td>
                    <Td>
                      {
                        this.state.res.romantic
                        ? <Icon as={FaHeart} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Touristy</Td>
                    <Td>
                      {
                        this.state.res.touristy
                        ? <Icon as={FaMap} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Trendy</Td>
                    <Td>
                      {
                        this.state.res.trendy
                        ? <Icon as={GiHighHeel} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Upscale</Td>
                    <Td>
                      {
                        this.state.res.upscale
                        ? <Icon as={FaBuilding} color={'teal.500'}/>
                        : <CloseIcon color={'gray.300'}/>
                      }
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Wheelchair Accessible</Td>
                    <Td>
                      {
                        this.state.res.wheelchair_accessible
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
