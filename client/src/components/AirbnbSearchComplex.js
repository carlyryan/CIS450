import React from 'react';

import {
	Box,
	Button,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	VStack,
	Checkbox
} from '@chakra-ui/react'

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	SearchIcon
} from '@chakra-ui/icons';

import {
	BiCurrentLocation,
} from 'react-icons/bi'

import {
	MdFastfood
} from 'react-icons/md'

import AirbnbCard from './AirbnbCard'
import RangeSliderWithLabel from './RangeSliderWithLabel'
import SliderWithLabel from './SliderWithLabel'

import { 
	getAirbnbsSimple, 
	getAirbnbsComplex 
} from '../fetcher'

class AirbnbSearchComplex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: 0,
			page: 1,
			pageSize: 3,
			searchIsClicked: false,
			num_beds_lt: 25,
			num_beds_gt: 0,
			room_type: "",
			stars_lt: 10,
			stars_gt: 0,
			minimum_nights: 0,
			maximum_nights: 100,
			postalCode: 0,
			review_count: 0,
			is_instant_bookable: true,
			host_acceptance_rate_gt: 0,
			/* Complex Info! */
			near_cuisine: "",
			restaurants_within_miles: 1.5,
			min_restaurant_count: 0,
			nearby_restaurant_avg_rating_lt: 0,
			nearby_restaurant_avg_rating_rt: 5,
			sort: "",
			results: [],
		};

		this.handleNumBedsSlider = this.handleNumBedsSlider.bind(this);
		this.handleStarsSlider = this.handleStarsSlider.bind(this);
		this.handleNightsSlider = this.handleNightsSlider.bind(this);

		this.handleReviewCount = this.handleReviewCount.bind(this);

		this.handleRoomType = this.handleRoomType.bind(this);
		this.handleBookable = this.handleBookable.bind(this);
		this.handlePostal = this.handlePostal.bind(this);

		this.handleHostAcceptanceRate = this.handleHostAcceptanceRate.bind(this);
		this.handleCuisine = this.handleCuisine.bind(this);
		this.handleRestaurantMiles = this.handleRestaurantMiles.bind(this);
		this.handleMinCount = this.handleMinCount.bind(this);

		this.handleNearbyRestaurantRatio = this.handleNearbyRestaurantRatio.bind(this);
		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);

		this.handlePrevPageButtonClick = this.handlePrevPageButtonClick.bind(this);
		this.handleNextPageButtonClick = this.handleNextPageButtonClick.bind(this);

	}

	handleSearchButtonClick() {
		if (this.state.searchIsClicked) {
			this.setState({
				numPages: 0,
				page: 1,
				results: []
			});
		}

		if (this.state.near_cuisine !== ""
			|| this.state.restaurants_within_miles !== 1.5
			|| this.state.min_restaurant_count !== 0
			|| this.state.nearby_restaurant_avg_rating_lt !== 0
			|| this.state.nearby_restaurant_avg_rating_rt !== 5) {
			
			getAirbnbsComplex(
				this.state.num_beds_lt,
				this.state.num_beds_gt,
				this.state.room_type,
				this.state.stars_lt,
				this.state.stars_gt,
				this.state.minimum_nights,
				this.state.maximum_nights,
				this.state.postalCode,
				this.state.review_count,
				this.state.is_instant_bookable,
				this.state.host_acceptance_rate_gt,
				this.state.near_cuisine,
				this.state.restaurants_within_miles,
				this.state.min_restaurant_count,
				this.state.nearby_restaurant_avg_rating_lt,
				this.state.nearby_restaurant_avg_rating_rt,
				this.state.sort).then((res) => {
					this.setState({
						results: res.results,
						numPages: res.results.length <= this.state.pageSize ? 1 : Math.ceil(res.results.length / this.state.pageSize)
					})
				});
		} else {
			getAirbnbsSimple(
				this.state.num_beds_lt,
				this.state.num_beds_gt,
				this.state.room_type,
				this.state.stars_lt,
				this.state.stars_gt,
				this.state.minimum_nights,
				this.state.maximum_nights,
				this.state.postalCode,
				this.state.review_count,
				this.state.is_instant_bookable,
				this.state.host_acceptance_rate_gt,
				this.state.sort
			).then((res) => {
				this.setState({
					results: res.results,
					numPages: res.results.length <= this.state.pageSize ? 1 : Math.ceil(res.results.length / this.state.pageSize)
				})

			})
		}

		this.setState(prevState => ({
			searchIsClicked: !prevState.searchIsClicked
		}));
	}

	handleNumBedsSlider(arr) {
		this.setState({
			num_beds_gt: arr[0],
			num_beds_lt: arr[1]
		})
	}

	handleStarsSlider(arr) {
		this.setState({
			stars_gt: arr[0],
			stars_lt: arr[1]
		})
	}

	handleNightsSlider(arr) {
		this.setState({
			minimum_nights: arr[0],
			maximum_nights: arr[1]
		})
	}

	handleReviewCount(val) {
		this.setState({
			review_count: val
		})
	}

	handleRoomType(event) {
		this.setState({
			room_type: event.target.value
		})
	}

	handleBookable(event) {
		this.setState({
			is_instant_bookable: event.target.checked
		})
	}

	handlePostal(event) {
		if (event === 0) {
			this.setState({
				postalCode: -1
			})
			return;
		}

		this.setState({
			postalCode: event.target.value
		})

	}
	handleHostAcceptanceRate(val) {
		this.setState({ host_acceptance_rate_gt: val })
	}
	handleCuisine(event) {
		this.setState({ near_cuisine: event.target.value })
	}
	handleNearbyRestaurantRatio(arr) {
		this.setState({
			nearby_restaurant_avg_rating_lt: arr[0],
			nearby_restaurant_avg_rating_rt: arr[1]
		})
	}
	handleRestaurantMiles(val) {
		this.setState({ restaurants_within_miles: val })
	}
	handleMinCount(val) {
		this.setState({ min_restaurant_count: val })
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

					{/* Postal Code Filter */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<Icon as={BiCurrentLocation} color={'red.400'} />}
						/>
						<Input
							placeholder={"Postal Code"}
							type='number'
							onChange={this.handlePostal}
							variant='outline'
						/>
					</InputGroup>

					{/* Room Type */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'} />}
						/>
						<Input
							placeholder="Room Type"
							onChange={this.handleRoomType}
							variant='outline'
						/>

					</InputGroup>

					{/* Cuisine */}
					<InputGroup
						maxW='300px'
						m='2'
					>
						<InputLeftElement
							children={<Icon as={MdFastfood} color={'red.400'} />}
						/>
						<Input
							placeholder={"Nearby Cuisine Type"}
							onChange={this.handleCuisine}
							variant='outline'
						/>
					</InputGroup>

					<br
						style={{"line-height":'1px'}}
					></br>

					{/* Instantly Bookable Checkbox */}
					<Checkbox
						colorScheme='red' 
						defaultIsChecked 
						onChange={this.handleBookable}
						size='lg'
					>
						Instantly Bookable
					</Checkbox>

					<VStack>
						<HStack>
							<RangeSliderWithLabel
								title={"Beds"}
								onChangeEnd={this.handleNumBedsSlider}
								min={1} 
								max={25} 
								lower_default={1} 
								upper_default={25}
							/>

							<RangeSliderWithLabel
								title={"Stars"}
								onChangeEnd={this.handleStarsSlider} 
								min={0} 
								max={5} 
								lower_default={0} 
								upper_default={5}
							/>
						</HStack>

						<HStack>
							<RangeSliderWithLabel
								title={"Nights"}
								onChangeEnd={this.handleNightsSlider}
								min={0} 
								max={100} 
								lower_default={0} 
								upper_default={100} 
							/>

							<SliderWithLabel
								title={"Min. Number of Reviews"}
								onChangeEnd={this.handleReviewCount}
								min={0} 
								max={100} 
								upper_default={0}
							/>
						</HStack>

						<HStack>
							<SliderWithLabel
								title={"Min. Host Acceptance Rate"}
								onChangeEnd={this.handleHostAcceptanceRate}
								min={0} 
								max={100} 
								upper_default={0}
							/>

							<RangeSliderWithLabel
								title={"Avg. Stars for Nearby Restaurants"}
								onChangeEnd={this.handleNearbyRestaurantRatio}
								min={0}
								max={5}
								lower_default={0}
								upper_default={5}
							/>
						</HStack>

						<HStack>
							<SliderWithLabel
								title={"Restaurants Within"}
								onChangeEnd={this.handleRestaurantMiles}
								min={0}
								max={50}
								upper_default={1.5} 
							/>

							<SliderWithLabel
								title={"Min. No. of Restaurants Nearby"}
								onChangeEnd={this.handleMinCount}
								min={0}
								max={10}
								upper_default={0} />
						</HStack>
					</VStack>

					{/* Results */}
					<Box
						display='flex'
						mt='2'
					>
						{
							this.state.searchIsClicked && this.state.results.length > 0
								?
									Array(this.state.page === this.state.numPages ?
										(this.state.results.length <= this.state.pageSize ?
											this.state.results.length :
											this.state.results.length % this.state.pageSize) :
										this.state.pageSize)
										.fill('')
										.map((_, i) => (
											<AirbnbCard
												key={this.state.results[(this.state.page - 1) * this.state.pageSize + i].id}
												image_url={this.state.results[(this.state.page - 1) * this.state.pageSize + i].picture_url}
												beds={this.state.results[(this.state.page - 1) * this.state.pageSize + i].beds}
												baths={this.state.results[(this.state.page - 1) * this.state.pageSize + i].bathrooms}
												title={this.state.results[(this.state.page - 1) * this.state.pageSize + i].name}
												stars={this.state.results[(this.state.page - 1) * this.state.pageSize + i].review_scores_rating}
												review_count={this.state.results[(this.state.page - 1) * this.state.pageSize + i].review_count}
												formatted_price={this.state.results[(this.state.page - 1) * this.state.pageSize + i].price}
												listing_id={this.state.results[(this.state.page - 1) * this.state.pageSize + i].id}
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
										<ArrowLeftIcon/>
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

				</VStack>
			</div>
		)
	}
}

export default AirbnbSearchComplex