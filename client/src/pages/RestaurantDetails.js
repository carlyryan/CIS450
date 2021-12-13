import React from 'react';
import MenuBar from '../components/MenuBar'
import RestaurantCardDetailed from "../components/RestaurantCardDetailed"

import { 
	Center 
} from '@chakra-ui/react'

class RestaurantDetails extends React.Component {
	render() {
		return (
			<div>
				<MenuBar/>
				<Center
					mt='2'
				>
					<RestaurantCardDetailed/>
				</Center>
			</div>
		)
	}
}

export default RestaurantDetails