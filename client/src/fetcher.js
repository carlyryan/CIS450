import config from './config.json'

const getRestaurant = async (business_id) => {
	var res = await fetch(`http://${config.server_host}:${config.server_port}/restaurant/${business_id}`, {
		method: 'GET'
	})

	return res.json();
}

export {
	getRestaurant
}