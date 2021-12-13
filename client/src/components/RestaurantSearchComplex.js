import React from 'react';

import {
	Button,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	VStack
} from '@chakra-ui/react'

import {
	SearchIcon,
  	StarIcon
} from '@chakra-ui/icons';

import {
	AiOutlineNumber
} from 'react-icons/ai'

import {
	BiCurrentLocation,
	BiCategory
} from 'react-icons/bi'

import {
	getRestaurants
} from '../fetcher'

import RestaurantCard from './RestaurantCard'

class RestaurantSearchComplex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchIsClicked: false,
			searchCategory: "",
			searchName:	"",
			searchPostalCode: "", 
			searchReviewCount: "",
			searchStars: "",
			results: []
		};

		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);

		this.handleSearchCategoryChange = this.handleSearchCategoryChange.bind(this);
		this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
		this.handleSearchPostalCodeChange = this.handleSearchPostalCodeChange.bind(this);
		this.handleSearchReviewCountChange = this.handleSearchReviewCountChange.bind(this);
		this.handleSearchStarsChange = this.handleSearchStarsChange.bind(this);
	}

	handleSearchButtonClick() {
		this.setState(prevState => ({
			searchIsClicked: !prevState.searchIsClicked
		}));

		if (this.state.searchIsClicked) {
			this.setState(prevState => ({
				searchCategory: "",
				searchName: "",
				searchPostalCode: "",
				searchReviewCount: "",
				searchStars: "",
				results: []
			}));
		} else {
			getRestaurants(this.state.searchCategory, this.state.searchName, this.state.searchPostalCode, this.state.searchReviewCount, this.state.searchStars, "name").then(res => {
				this.setState(prevState => ({
					results: res.results
				}));
			});
		}
	}

	handleSearchCategoryChange(e) {
		this.setState(prevState => ({
			searchCategory: e.target.value
		}));
	}

	handleSearchNameChange(e) {
		this.setState(prevState => ({
			searchName: e.target.value
		}));
	}

	handleSearchPostalCodeChange(e) {
		this.setState(prevState => ({
			searchPostalCode: e.target.value
		}));
	}

	handleSearchReviewCountChange(e) {
		this.setState(prevState => ({
			searchReviewCount: e.target.value
		}));
	}

	handleSearchStarsChange(e) {
		this.setState(prevState => ({
			searchStars: e.target.value
		}));
	}

	render() {
		return (
			<div>
				<VStack>
					{/* Search/Reset Button */}
					<Button
						backgroundColor={'white'}
						color={'red.400'}
						mt='2'
						onClick={this.handleSearchButtonClick}
						size='lg'
						variant='outline'
					>
					{this.state.searchIsClicked ? 'Reset' : 'Search'}
					</Button>

					{/* Category Filter */} 
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<Icon as={BiCategory} color={'red.400'}/>}
						/>
						<Input
							placeholder={this.state.searchCategory ? "" : "Category"}
							value={this.state.searchCategory ? this.state.searchCategory : ""}
							onChange={this.handleSearchCategoryChange}
							variant='outline'
						/>
					</InputGroup>

					{/* Name Filter */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder={this.state.searchName ? "" : "Name"}
							value={this.state.searchName ? this.state.searchName : ""}
							onChange={this.handleSearchNameChange}
							variant='outline' 
						/>
					</InputGroup>

					{/* Postal Code Filter */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<Icon as={BiCurrentLocation} color={'red.400'}/>}
						/>
						<Input
							placeholder={this.state.searchPostalCode ? "" : "Postal Code"}
							value={this.state.searchPostalCode ? this.state.searchPostalCode : ""}
							onChange={this.handleSearchPostalCodeChange}
							variant='outline'
						/>
					</InputGroup>

					{/* Review Count Filter */}
					<InputGroup
						maxW='300px'
						mt='2'
					>	
						<InputLeftElement
							children={<Icon as={AiOutlineNumber} color={'red.400'}/>}
						/>
						<Input
							placeholder={this.state.searchReviewCount ? "" : "Review Count"}
							value={this.state.searchReviewCount ? this.state.searchReviewCount : ""}
							onChange={this.handleSearchReviewCountChange}
							variant='outline'
						/>
					</InputGroup>

					{/* Stars Filter */}
					<InputGroup
						maxW='300px'
						mt='2'
					>	
						<InputLeftElement
							children={<StarIcon color='red.400'/>}
						/>
						<Input 
							placeholder={this.state.searchStars ? "" : "Stars"}
							value={this.state.searchStars ? this.state.searchStars : ""}
							onChange={this.handleSearchStarsChange}
							variant='outline' 
						/>
					</InputGroup>

					{
						this.state.searchIsClicked && this.state.results.length > 0
						? 
							<RestaurantCard
								image_url="https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
								business_id={this.state.results[0].business_id}
								name={this.state.results[0].name}
								address={"1616 Sylvan Ave"}
								postal_code={this.state.results[0].postal_code}
								stars={this.state.results[0].stars}
								review_count={this.state.results[0].review_count}
							/>
						: <></>
					}

				</VStack>
			</div>
		);
	}
}

export default RestaurantSearchComplex