import config from './config.json'

const getRestaurant = async (businessId) => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant/${businessId}`, {
		method: 'GET'
	})

	return res.json();
}

const getRestaurants = async (category, name, postalCode, reviewCount, stars, sort) => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurants?category=${category}&name=${name}&postalCode=${postalCode}&reviewCount=${reviewCount}&stars=${stars}&sort=${sort}`, {
		method: 'GET'
	});

	return res.json();
}


const getAirbnbsSimple = async (num_beds_lt, num_beds_gt, room_type, stars_lt, stars_gt, minimum_nights, maximum_nights, postal_code, review_count, is_instant_bookable, host_acceptance_rate, sort = "stars") => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/airbnbs?
			num_beds_lt=${num_beds_lt}&num_beds_gt=${num_beds_gt}&room_type=${room_type}
			&stars_lt=${stars_lt}&stars_gt=${stars_gt}
			&minimum_nights=${minimum_nights}&maximum_nights=${maximum_nights}
			&postal_code=${postal_code}&review_count=${review_count}
			&is_instant_bookable=${is_instant_bookable}
			&host_acceptance_rate=${host_acceptance_rate}
			&sort=${sort}`, {
		method: 'GET'
	});
	return res.json();
}

const getAirbnbsComplex = async (num_beds_lt, num_beds_gt, room_type, stars_lt,
	stars_gt, minimum_nights, maximum_nights, postal_code, review_count, is_instant_bookable,
	host_acceptance_rate, sort = "stars", near_cuisine, restaurant_within_miles,
	min_restaurant_count, nearby_restaurant_avg_rating_lt, nearby_restaurant_avg_rating_rt) => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/airbnbs?
			num_beds_lt=${num_beds_lt}&num_beds_gt=${num_beds_gt}&room_type=${room_type}
			&stars_lt=${stars_lt}&stars_gt=${stars_gt}
			&minimum_nights=${minimum_nights}&maximum_nights=${maximum_nights}
			&postal_code=${postal_code}&review_count=${review_count}
			&is_instant_bookable=${is_instant_bookable}
			&host_acceptance_rate=${host_acceptance_rate}
			&near_cuisine=${near_cuisine},
			&restaurant_within_miles=${restaurant_within_miles},
			&min_restaurant_count=${min_restaurant_count},
			&nearby_restaurant_avg_rating_lt=${nearby_restaurant_avg_rating_lt},
			&nearby_restaurant_avg_rating_rt=${nearby_restaurant_avg_rating_rt}
			&sort=${sort}`, {
		method: 'GET'
	});

	return res.json();
}


export {
	getRestaurant,
	getRestaurants,
	getAirbnbsSimple,
	getAirbnbsComplex
}
