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
	var query = `http://${config.server_host}:${config.server_port}/airbnbs?`
		+ (num_beds_gt !== 0 ? `&num_beds_gt=${num_beds_gt}` : "")
		+ (num_beds_lt !== 25 ? `&num_beds_lt=${num_beds_lt}` : "")
		+ (room_type ? `&room_type=${room_type}` : "")
		+ (minimum_nights > 0 ? `&minimum_nights=${minimum_nights}` : "")
		+ (maximum_nights < 100 ? `&maximum_nights=${maximum_nights}` : "")
		+ (postal_code !== 0 ? `&postal_code=${postal_code}` : "")
		+ (review_count !== 0 ? `&review_count=${review_count}` : "")
		+ (`&is_instant_bookable=${is_instant_bookable}`)
		+ (host_acceptance_rate > 0 ? `&host_acceptance_rate=${host_acceptance_rate}` : "")
		+ (stars_lt < 5 ? `&stars_lt=${stars_lt}` : "")
		+ (stars_gt > 0 ? `&stars_gt=${stars_gt}` : "")
		+ (sort ? `&sort=${sort}` : "");

	console.log(query);

	var res = fetch(query, {
		method: 'GET'
	}).then((res) => {
		return res.json();
	}).catch((e) => {
		console.log(e);
		return { results: [] };
	})

	return res;
}

const getAirbnbsComplex = async (num_beds_lt, num_beds_gt, room_type, stars_lt,
	stars_gt, minimum_nights, maximum_nights, postal_code, review_count, is_instant_bookable,
	host_acceptance_rate, near_cuisine, restaurant_within_miles,
	min_restaurant_count, nearby_restaurant_avg_rating_lt, nearby_restaurant_avg_rating_rt, sort = "stars") => {
	var query = `http://${config.server_host}:${config.server_port}/airbnbs_by_yelp?`
		+ (num_beds_gt !== 0 ? `&num_beds_gt=${num_beds_gt}` : "")
		+ (num_beds_lt !== 25 ? `&num_beds_lt=${num_beds_lt}` : "")
		+ (room_type ? `&room_type=${room_type}` : "")
		+ (minimum_nights > 0 ? `&minimum_nights=${minimum_nights}` : "")
		+ (maximum_nights < 100 ? `&maximum_nights=${maximum_nights}` : "")
		+ (postal_code !== 0 ? `&postal_code=${postal_code}` : "")
		+ (review_count !== 0 ? `&review_count=${review_count}` : "")
		+ (`&is_instant_bookable=${is_instant_bookable}`)
		+ (host_acceptance_rate > 0 ? `&host_acceptance_rate=${host_acceptance_rate}` : "")
		+ (stars_lt < 5 ? `&stars_lt=${stars_lt}` : "")
		+ (stars_gt > 0 ? `&stars_gt=${stars_gt}` : "")
		+ (near_cuisine ? `&near_cuisine=${near_cuisine}` : "")
		+ (restaurant_within_miles !== 1.5 ? `&restaurant_within_miles=${restaurant_within_miles}` : "")
		+ (min_restaurant_count !== 0 ? `&min_restaurant_count=${min_restaurant_count}` : "")
		+ (nearby_restaurant_avg_rating_lt !== 0 ? `&nearby_restaurant_avg_rating_lt=${nearby_restaurant_avg_rating_lt}` : "")
		+ (nearby_restaurant_avg_rating_rt !== 5 ? `&nearby_restaurant_avg_rating_rt=${nearby_restaurant_avg_rating_rt}` : "")
		+ (sort ? `&sort=${sort}` : "");

	console.log(query);

	var res = fetch(query, {
		method: 'GET'
	}).then((res) => {
		console.log(res);
		return res.json();
	}).catch((e) => {
		console.log(e);
		return { results: [] };
	})

	return res;
}


const getAirbnb = async (listing_id) => {
	var res = fetch(`http://${config.server_host}:${config.server_port}/airbnb/${listing_id}`, {
		method: 'GET'
	}).then((res) => {
		return res.json();
	}).catch((e) => {
		return { results: [{}] }
	});

	return res;
}


const getZipCodeInfo = async (superhost) => {
	var superhost_filter = superhost ? `&superhost=${superhost}` : "";

	var q1 = fetch(`http://${config.server_host}:${config.server_port}/airbnb_zip?criterion=count${superhost_filter}`)
	var q2 = fetch(`http://${config.server_host}:${config.server_port}/airbnb_zip?criterion=avg_rating${superhost_filter}`)
	var q3 = fetch(`http://${config.server_host}:${config.server_port}/airbnb_zip?criterion=avg_price${superhost_filter}`)


	var res = await Promise.all([q1, q2, q3]);
	var r1 = await res[0].json();
	var r2 = await res[1].json();
	var r3 = await res[2].json();

	return [r1, r2, r3];
}


const getCheapestPostal = async () => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/cheapest_postal_code`);
	return res.json();
}

const getMostPopularMexicanRestaurant = async () => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/category_most_common_with_category/Mexican`);
	return res.json();
}

export {
	getRestaurant,
	getRestaurants,
	getAirbnbsSimple,
	getAirbnbsComplex,
	getAirbnb,
	getZipCodeInfo,
	getCheapestPostal,
	getMostPopularMexicanRestaurant
}
