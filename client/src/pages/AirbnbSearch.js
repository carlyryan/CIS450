import React from 'react';
import MenuBar from '../components/MenuBar'

import AirbnbSearchComplex from '../components/AirbnbSearchComplex';

class AirbnbSearch extends React.Component {
    render() {
        return (
             <div>
                <MenuBar/>
                <AirbnbSearchComplex/>
            </div>
        )
    }
}

export default AirbnbSearch