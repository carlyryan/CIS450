import React from 'react';

import {
	Button,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Radio,
	RadioGroup,
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
	BiCurrentLocation
} from 'react-icons/bi'

class RestaurantSearchComplex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchIsClicked: false,
			searchName: undefined,
			searchPostalCode: undefined, 
			searchReviewCount: undefined,
			searchStars: undefined
		};

		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
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
				searchName: undefined,
				searchPostalCode: undefined,
				searchReviewCount: undefined,
				searchStars: undefined
			}));
		} else {
			console.log("Searching...");
			console.log("Filtering Name for: " + this.state.searchName);
			console.log("Filtering Postal Code for: " + this.state.searchPostalCode);
			console.log("Filtering Review Count for: " + this.state.searchReviewCount);
			console.log("Filtering Stars for: " + this.state.searchStars);
		}
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
						mt='2'
						onClick={this.handleSearchButtonClick}
						size='lg'
						variant='outline'
					>
					{this.state.searchIsClicked ? 'Reset' : 'Search'}
					</Button>

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
				</VStack>
			</div>
		);
	}
}

export default RestaurantSearchComplex