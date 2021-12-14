import {
    Box,
    Button,
    Icon,
    Image,
    Link
} from '@chakra-ui/react'

import {
    StarIcon
} from '@chakra-ui/icons'

import {
    FaAirbnb
} from 'react-icons/fa'

import React from 'react'

class AirbnbCard extends React.Component {
    constructor(props) {
        super(props);
        this.defaultContent = this.defaultContent.bind(this);
    }

    defaultContent() {
        const default_content = {
            beds: 3,
            baths: 1,
            formatted_price: "$117.00",
            image_url: "https://i.kym-cdn.com/entries/icons/facebook/000/020/260/nilesyy-nilez.jpg",
            rating: 5,
            review_count: 30,
            title: "Scooby Doo House"
        }

        return default_content;
    }



    render() {
        return (
            <div>
                <Box
                    borderRadius='lg'
                    borderWidth='1px'
                    maxW='300px'
                    m='2'
                    overflow='hidden'
                >

                    {/* Image */}
                    <Image
                        src={this.props.image_url ? this.props.image_url : this.defaultContent().image_url}
                    />

                    {/* Airbnb Information */}
                    <Box
                        p='6'
                    >
                        {/* Bed/Bath */}
                        <Box
                            alignItems='center'
                            display='flex'
                        >
                            <FaAirbnb
                                color='red'
                            />

                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                fontSize='xs'
                                letterSpacing='wide'
                                textTransform='uppercase'
                                ml='2'

                            >
                                {this.props.beds ? this.props.beds : this.defaultContent().beds} beds &bull; {this.props.baths ? this.props.baths : this.defaultContent().baths} baths
                            </Box>
                        </Box>

                        {/* Title */}
                        <Box
                            as='h4'
                            fontWeight='semibold'
                            lineHeight='tight'
                            mt='2'
                            isTruncated
                        >
                            {this.props.title ? this.props.title : this.defaultContent().title}
                        </Box>

                        {/* Price */}
                        <Box
                            mt='2'
                        >
                            {this.props.formatted_price ? this.props.formatted_price : this.defaultContent().formatted_price}
                            <Box
                                as='span'
                                color='gray.600'
                                fontSize='xs'
                            >
                                /night
                            </Box>
                        </Box>

                        {/* this.props.rating, this.props.review_count */}
                        <Box
                            alignItems='center'
                            display='flex'
                            mt='2'>
                            {/* this.props.rating */}
                            {
                                Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < (this.props.rating ? this.props.rating : this.defaultContent().rating) ? 'red.400' : 'gray.300'}
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
                                mt='2'
                            >
                                {this.props.review_count ? this.props.review_count : this.defaultContent().review_count} reviews
                            </Box>
                        </Box>
                        <Button as={'a'} href={"/airbnb/" + this.props.listing_id} mt={4}>View more</Button>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default AirbnbCard