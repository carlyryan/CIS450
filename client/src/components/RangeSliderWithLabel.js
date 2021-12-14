
import React from 'react'

import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb
} from '@chakra-ui/react'

import {
  MdGraphicEq
} from 'react-icons/md'


class SliderWithLabel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      min: props.lower_default,
      max: props.upper_default
    }

    this.lowerbound = props.min
    this.upperbound = props.max
    this.lower_default = props.lower_default
    this.upper_default = props.upper_default
    this.onChangeEnd = props.onChangeEnd
    this.title = props.title
  }

  render() {
    return (
      <Box w={300} m={6}>
        {this.title}: {this.state.min}, {this.state.max}
        <RangeSlider
          defaultValue={[this.lower_default, this.upper_default]}
          min={this.lowerbound}
          max={this.upperbound}
          step={1}
          onChangeEnd={(val) => { this.setState({ min: val[0], max: val[1] }); this.onChangeEnd(val) }}>
          <RangeSliderTrack bg='red.100'>
            <RangeSliderFilledTrack bg='tomato' />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0}>
            <Box color='tomato' as={MdGraphicEq} />
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={6} index={1}>
            <Box color='red.400' as={MdGraphicEq} />
          </RangeSliderThumb>
        </RangeSlider>

      </Box>
    )
  }
}


export default SliderWithLabel