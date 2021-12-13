import {
  Box,
  Button,
  Image,
  Link
} from '@chakra-ui/react'

import {
  StarIcon
} from '@chakra-ui/icons';

import React from 'react'

export default function RestaurantCard(props) {
  const restaurant_properties = {
    image_url: "https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    business_id: "",
    name: "ABC",
    address: "DEF",
    postal_code: 11111,
    stars: 3,
    review_count: 0
  }

  return (
    <div>
    <Box 
      mt='2'
      maxW='300px'
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden'
    >  
      {/* Image */}
      <Image 
        src={restaurant_properties.image_url} 
        alt="https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
      />

      {/* Restaurant Information */}
      <Box 
        p='6'
      > 
        {/* restaurant_properties.name */}
        <Box
          mt='1'
          fontSize='xl'
          fontWeight='semibold'
          isTruncated
          lineHeight='tight'
        >
          {restaurant_properties.name}
        </Box>

        {/* restaurant_properties.address */}
        <Box
          mt='1'
          fontSize='xs'
          isTruncated
          lineHeight='tight'
        >
          {restaurant_properties.address}, Austin, TX, {restaurant_properties.postal_code}
        </Box>

        {/* restaurant_properties.stars, restaurant_properties.review_count */}
        <Box 
          display='flex'
          mt='2' 
          alignItems='center'
        >
          {/* restaurant_properties.stars */}
          {
            Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < restaurant_properties.stars ? 'red.400' : 'gray.300'}
                />
                )
              )
          }

          {/* restaurant_properties.review_count */}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {restaurant_properties.review_count} reviews
          </Box>
        </Box>

        {/* Link */}
        <Button
          as={'a'}
          href={'http://localhost:3000/restaurant'}
          mt='4'
        >
        View More
        </Button>
      </Box>
    </Box>
    </div>
  );
}