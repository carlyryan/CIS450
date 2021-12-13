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

import AirbnbCardAndrew from './AirbnbCardAndrew'

class AirbnbSearchComplex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchIsClicked: false,
		};

		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
	}

	handleSearchButtonClick() {
		this.setState(prevState => ({
			searchIsClicked: !prevState.searchIsClicked
		}));

		if (this.state.searchIsClicked) {
			this.setState(prevState => ({

			}));
		} else {
			
		}
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

					{/* Filter 1 */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder="Filter 1"
							variant='outline'
						/>
					</InputGroup>

					{/* Filter 2 */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder="Filter 2"
							variant='outline'
						/>
					</InputGroup>

					{/* Filter 3 */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder="Filter 3"
							variant='outline'
						/>
					</InputGroup>

					{/* Filter 4 */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder="Filter 4"
							variant='outline'
						/>
					</InputGroup>

					{/* Filter 5 */}
					<InputGroup
						maxW='300px'
						mt='2'
					>
						<InputLeftElement
							children={<SearchIcon color={'red.400'}/>}
						/>
						<Input
							placeholder="Filter 5"
							variant='outline'
						/>
					</InputGroup>

					<AirbnbCardAndrew/>
				</VStack>
			</div>
		)
	}
}

export default AirbnbSearchComplex