import React from 'react';

import {
	Box,
	Button,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	VStack
} from '@chakra-ui/react'

import {
	ArrowLeftIcon,
	ArrowRightIcon,
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
			numPages: 0,
			page: 1,
			searchIsClicked: false,
			searchCategory: "",
			searchName: "",
			searchPostalCode: "",
			searchReviewCount: "",
			searchStars: "",
			results: [],
		};

		this.handleNextPageButtonClick = this.handleNextPageButtonClick.bind(this);
		this.handlePrevPageButtonClick = this.handlePrevPageButtonClick.bind(this);
		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);

		this.handleSearchCategoryChange = this.handleSearchCategoryChange.bind(this);
		this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
		this.handleSearchPostalCodeChange = this.handleSearchPostalCodeChange.bind(this);
		this.handleSearchReviewCountChange = this.handleSearchReviewCountChange.bind(this);
		this.handleSearchStarsChange = this.handleSearchStarsChange.bind(this);
	}

	handleNextPageButtonClick() {
		this.setState(prevState => ({
			page: Math.min(prevState.page + 1, prevState.numPages)
		}));
	}

	handlePrevPageButtonClick() {
		this.setState(prevState => ({
			page: Math.max(prevState.page - 1, 1)
		}));
	}

	handleSearchButtonClick() {
		this.setState(prevState => ({
			searchIsClicked: !prevState.searchIsClicked
		}));

		if (this.state.searchIsClicked) {
			this.setState(prevState => ({
				numPages: 0,
				page: 1,
				searchCategory: "",
				searchName: "",
				searchPostalCode: "",
				searchReviewCount: "",
				searchStars: "",
				results: []
			}));
		} else {
			getRestaurants(this.state.searchCategory, this.state.searchName, this.state.searchPostalCode, this.state.searchReviewCount, this.state.searchStars, "name").then(res => {
				console.log(res);

				this.setState(
					{
						results: res.results,
						numPages: res.results.length <= 3 ? 1 : Math.ceil(res.results.length / 3)
					},
					() => {
						console.log("Done setting the state");
						console.log("length: " + this.state.results.length);
						console.log("numPages: " + this.state.numPages);
					}
				);
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
						// color={'red.400'}
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
							children={<Icon as={BiCategory} color={'red.400'} />}
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
							children={<SearchIcon color={'red.400'} />}
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
							children={<Icon as={BiCurrentLocation} color={'red.400'} />}
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
							children={<Icon as={AiOutlineNumber} color={'red.400'} />}
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
							children={<StarIcon color='red.400' />}
						/>
						<Input
							placeholder={this.state.searchStars ? "" : "Stars"}
							value={this.state.searchStars ? this.state.searchStars : ""}
							onChange={this.handleSearchStarsChange}
							variant='outline'
						/>
					</InputGroup>

					{/* Results */}
					<Box
						display='flex'
						mt='2'
					>
						{
							this.state.searchIsClicked && this.state.results.length > 0
								?
								Array(this.state.page == this.state.numPages ? (this.state.results.length <= 3 ? this.state.results.length : this.state.results.length % 3) : 3)
									.fill('')
									.map((_, i) => (
										<RestaurantCard
											address={this.state.results[(this.state.page - 1) * 3 + i].address}
											business_id={this.state.results[(this.state.page - 1) * 3 + i].business_id}
											name={this.state.results[(this.state.page - 1) * 3 + i].name}
											postal_code={this.state.results[(this.state.page - 1) * 3 + i].postal_code}
											stars={this.state.results[(this.state.page - 1) * 3 + i].stars}
											review_count={this.state.results[(this.state.page - 1) * 3 + i].review_count}
										/>
									))
								: <></>
						}
					</Box>

					<Box
						display='flex'
						mt='2'
					>
						{/* Previous Page Button */}
						{
							this.state.searchIsClicked && this.state.page > 1
								?
								<Button
									backgroundColor={'white'}
									// color={'red.400'}
									mt='2'
									mr='2'
									onClick={this.handlePrevPageButtonClick}
									size='lg'
									variant='outline'
								>
									<ArrowLeftIcon />
								</Button>
								: <></>
						}

						{/* Next Page Button */}
						{
							this.state.searchIsClicked && this.state.page < this.state.numPages
								?
								<Button
									backgroundColor={'white'}
									// color={'red.400'}
									mt='2'
									onClick={this.handleNextPageButtonClick}
									size='lg'
									variant='outline'
								>
									<ArrowRightIcon />
								</Button>
								: <></>
						}
					</Box>

					<br></br>

				</VStack>
			</div>
		);
	}
}

export default RestaurantSearchComplex