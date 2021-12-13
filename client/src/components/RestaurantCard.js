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

        this.defaultContent = this.defaultContent.bind(this);

    }

    defaultContent() {
        const default_content = {
            image_url: "https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
            business_id: "Xw8tuI30T-xihpzwBV-zJg",
            name: "El Pollo Rey",
            address: "1725 E Riverside Dr",
            postal_code: 78741,
            stars: 5,
            review_count: 11
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
                        src={"https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale"} 
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
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {this.props.review_count ? this.props.review_count : this.defaultContent().review_count} reviews
                            </Box>
                        </Box>

                        {/* Link */}
                        <Button
                            as={'a'}
                            href={'http://localhost:3000/restaurant/' + (this.props.business_id ? this.props.business_id : this.defaultContent().business_id)}
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