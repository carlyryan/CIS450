import {
  Box,
  Button,
  Image
} from '@chakra-ui/react'

import {
  StarIcon
} from '@chakra-ui/icons'

import React from 'react'

class RestaurantCard extends React.Component {

  constructor(props) {
    super(props);

    this.defaultContent = this.defaultContent.bind(this);
  }

  defaultContent() {
    const default_content = {
      address: "1725 E Riverside Dr",
      business_id: "Xw8tuI30T-xihpzwBV-zJg",
      image_url: "https://bsmedia.business-standard.com/media-handler.php?mediaPath=https://bsmedia.business-standard.com/_media/bs/img/article/2021-10/06/full/1633506841-1584.jpg&width=1200",
      name: "El Pollo Rey",
      postal_code: 78741,
      review_count: 11,
      stars: 5
    };

    return default_content;
  }

  render() {
    return (
      <div>
        <Box
          borderRadius='lg'
          borderWidth='1px'
          maxW='300px'
          mt='2'
          overflow='hidden'
        >

          {/* Image */}
          <Image
            src={this.props.image_url ? this.props.image_url : this.defaultContent().image_url}
          />

          {/* Restaurant Information */}
          <Box
            p='6'
          >
            {/* this.props.name */}
            <Box
              mt='1'
              fontSize='xl'
              fontWeight='semibold'
              isTruncated
              lineHeight='tight'
            >
              {this.props.name ? this.props.name : this.defaultContent().name}
            </Box>

            {/* this.props.address */}
            <Box
              mt='1'
              fontSize='xs'
              isTruncated
              lineHeight='tight'
            >
              {this.props.address ? this.props.address : this.defaultContent().address}, Austin, TX, {this.props.postal_code ? this.props.postal_code : this.defaultContent().postal_code}
            </Box>

            {/* this.props.stars, this.props.review_count */}
            <Box
              display='flex'
              mt='2'
              alignItems='center'
            >

              {/* this.props.stars */}
              {
                Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < (this.props.stars ? this.props.stars : this.defaultContent().stars) ? 'red.400' : 'gray.300'}
                    />
                  )
                  )
              }

              {/* this.props.review_count */}
              <Box
                as='span'
                color='gray.600'
                fontSize='sm'
                ml='2'
              >
                {this.props.review_count ? this.props.review_count : this.defaultContent().review_count} reviews
              </Box>
            </Box>

            {/* Link */}
            <Button
              as={'a'}
              href={'http://localhost:3000/restaurant/' + (this.props.business_id ? this.props.business_id : this.defaultContent().business_id)}
              target="_blank"
              mt='4'
            >
              View More
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}

export default RestaurantCard