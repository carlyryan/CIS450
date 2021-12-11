import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './pages/HomePage';
import AirbnbSearch from './pages/AirbnbSearch'
import RestaurantSearch from './pages/RestaurantSearch'
import Statistics from './pages/Statistics'


import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';


ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
      <div>
        <Router>
          <Routes>
            <Route exact
              path="/"
              element={<HomePage />} />
            <Route exact
              path="/airbnbs"
              element={<AirbnbSearch />} />
            <Route exact
              path="/restaurants"
              element={<RestaurantSearch />} />
            <Route exact
              path="/statistics"
              element={<Statistics />} />
          </Routes>
        </Router>
      </div>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
