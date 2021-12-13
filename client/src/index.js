import React from 'react';
import ReactDOM from 'react-dom';

import { 
  ChakraProvider 
} from '@chakra-ui/react'

import HomePage from './pages/HomePage';

import AirbnbSearch from './pages/AirbnbSearch'

import RestaurantDetails from "./pages/RestaurantDetails"
import RestaurantSearch from './pages/RestaurantSearch'

import Statistics from './pages/Statistics'

import {
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom';


ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
      <div>
        <Router>
          <Routes>
            <Route 
              exact
              path="/"
              element={<HomePage/>} 
            />
            <Route 
              exact
              path="/airbnbs"
              element={<AirbnbSearch/>} 
            />

            {/* Restaurant Search */}
            <Route 
              exact
              path="/restaurants"
              element={<RestaurantSearch/>}
            />

            {/* Restaurant Details */}
            <Route
              exact
              path="/restaurant"
              element={<RestaurantDetails/>}
            />

            <Route 
              exact
              path="/statistics"
              element={<Statistics/>}
            />
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
