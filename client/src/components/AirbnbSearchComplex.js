import React from 'react';

import {
	Box,
	Button,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	VStack,
	Center,
	Checkbox
} from '@chakra-ui/react'

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	SearchIcon,
	StarIcon,
} from '@chakra-ui/icons';

import {
	MdGraphicEq
} from 'react-icons/md'

import {
	BiCurrentLocation,
	BiCategory
} from 'react-icons/bi'

import AirbnbCard from './AirbnbCard'
import RangeSliderWithLabel from './RangeSliderWithLabel'
import SliderWithLabel from './SliderWithLabel'

import { getAirbnbsSimple, getAirbnbsComplex } from '../fetcher'

class AirbnbSearchComplex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			numPages: 0,
			page: 1,
			pagesize: 3,
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
		// condition to check if complex or simple
		// this.setState({
		// 	results: [],
		// 	numPages: 0
		// })
		console.log(this.state);
		if (this.state.near_cuisine !== ""
			|| this.state.restaurants_within_miles !== 1.5
			|| this.state.min_restaurant_count !== 0
			|| this.state.nearby_restaurant_avg_rating_lt !== 0
			|| this.state.nearby_restaurant_avg_rating_rt !== 5) {
			getAirbnbsComplex(this.state.num_beds_lt,
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
					console.log(res);
					this.setState({
						results: res.results,
						numPages: res.results.length <= this.state.pagesize ? 1 : Math.ceil(res.results.length / this.state.pagesize)
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
				console.log(res);
				this.setState({
					results: res.results,
					numPages: res.results.length <= this.state.pagesize ? 1 : Math.ceil(res.results.length / this.state.pagesize)
				})

			})
		}
	}

	handleNumBedsSlider(arr) {
		this.setState({
			num_beds_gt: arr[0],
			num_beds_lt: arr[1]
		})

		console.log(this.state)
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
		console.log(event.target.checked);
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
					{/* Postal Code Filter */}
					<InputGroup
						maxW='300px'
						m='2'
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
					{/* Rooom Type */}
					<InputGroup
						maxW='300px'
						m='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'} />}
						/>
						<Input
							placeholder="Room type"
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
							children={<Icon as={BiCurrentLocation} color={'red.400'} />}
						/>
						<Input
							placeholder={"Near Cuisine Type? (e.g. chinese)"}
							onChange={this.handleCuisine}
							variant='outline'
						/>
					</InputGroup>

					<Checkbox size='lg' colorScheme='red' defaultIsChecked onChange={this.handleBookable}>
						Is Instantly Bookable?
					</Checkbox>

					<Center>
						<RangeSliderWithLabel
							title={"# Beds"}
							onChangeEnd={this.handleNumBedsSlider} min={1} max={25} lower_default={1} upper_default={25} />

						<RangeSliderWithLabel
							title={"Stars"}
							onChangeEnd={this.handleStarsSlider} min={0} max={5} lower_default={0} upper_default={5} />

						<RangeSliderWithLabel
							title={"# Nights"}
							onChangeEnd={this.handleNightsSlider} min={0} max={100} lower_default={0} upper_default={100} />
					</Center>

					<Center>
						<SliderWithLabel
							title={"Minimum number of Reviews"}
							onChangeEnd={this.handleReviewCount} min={0} max={100} upper_default={0}
						/>
						<SliderWithLabel
							title={"Host Acceptance Rate (%)"}
							onChangeEnd={this.handleHostAcceptanceRate} min={0} max={100} upper_default={0} />
					</Center>

					<Center>
						<RangeSliderWithLabel
							title={"Avg Stars for Nearby Restaurants"}
							onChangeEnd={this.handleNearbyRestaurantRatio} min={0} max={5} lower_default={0} upper_default={5} />
						<SliderWithLabel
							title={"Restaurants within"}
							onChangeEnd={this.handleRestaurantMiles} min={0} max={50} upper_default={1.5} />

						<SliderWithLabel
							title={"Minimum restaurants nearby"}
							onChangeEnd={this.handleMinCount} min={0} max={10} upper_default={0} />
					</Center>

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

					{/* Results */}
					<Box
						display='flex'
						mt='2'
					>
						{
							this.state.results.length > 0
								?
								Array(this.state.page === this.state.numPages ?
									(this.state.results.length <= this.state.pagesize ?
										this.state.results.length :
										this.state.results.length % this.state.pagesize) :
									this.state.pagesize)
									.fill('')
									.map((_, i) => (
										<AirbnbCard
											key={this.state.results[(this.state.page - 1) * this.state.pagesize + i].id}
											image_url={this.state.results[(this.state.page - 1) * this.state.pagesize + i].picture_url}
											beds={this.state.results[(this.state.page - 1) * this.state.pagesize + i].beds}
											baths={this.state.results[(this.state.page - 1) * this.state.pagesize + i].bathrooms}
											title={this.state.results[(this.state.page - 1) * this.state.pagesize + i].name}
											stars={this.state.results[(this.state.page - 1) * this.state.pagesize + i].review_scores_rating}
											review_count={this.state.results[(this.state.page - 1) * this.state.pagesize + i].review_count}
											formatted_price={this.state.results[(this.state.page - 1) * this.state.pagesize + i].price}
											listing_id={this.state.results[(this.state.page - 1) * this.state.pagesize + i].id}
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
							this.state.page > 1
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
							this.state.page < this.state.numPages
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