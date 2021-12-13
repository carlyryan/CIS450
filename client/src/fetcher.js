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

export {
	getRestaurant,
	getRestaurants
}