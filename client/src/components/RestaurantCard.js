import {
    Box,
    Button,
    Image,
    Link
} from '@chakra-ui/react'

import {
    StarIcon
} from '@chakra-ui/icons'

import React from 'react'

class RestaurantCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                        src={this.props.image_url} 
                        alt="https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
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
                            {this.props.name}
                        </Box>

                        {/* this.props.address */}
                        <Box
                            mt='1'
                            fontSize='xs'
                            isTruncated
                            lineHeight='tight'
                        >
                            {this.props.address}, Austin, TX, {this.props.postal_code}
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
                                            color={i < this.props.stars ? 'red.400' : 'gray.300'}
                                        />
                                    )
                                )
                            }

                            {/* this.props.review_count */}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {this.props.review_count} reviews
                            </Box>
                        </Box>

                        {/* Link */}
                        <Button
                            as={'a'}
                            href={'http://localhost:3000/restaurant/' + this.props.business_id}
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