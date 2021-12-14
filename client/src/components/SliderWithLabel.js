
import React from 'react'

import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react'

import {
  MdGraphicEq
} from 'react-icons/md'


class SliderWithLabel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      max: props.upper_default
    }

    this.lowerbound = props.min
    this.upperbound = props.max
    this.upper_default = props.upper_default
    this.onChangeEnd = props.onChangeEnd
    this.title = props.title
  }

  render() {
    return (
      <Box w={300} m={6}>
        {this.title}: {this.state.max}
        <Slider
          defaultValue={this.upper_default}
          min={this.lowerbound}
          max={this.upperbound}
          step={1}
          onChangeEnd={(val) => { this.setState({ max: val }); this.onChangeEnd(val) }}>
          <SliderTrack bg='red.100'>
            <SliderFilledTrack bg='tomato' />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='tomato' as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </Box>
    )
  }
}


export default SliderWithLabel