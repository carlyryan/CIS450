const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Simple Routes based on Simple Queries


// ROUTE 1 -- This query finds all restaurants of a certain category
// Example category is: Lebanese, Chinese, Indian, American, etc.
app.get('/restaurants/cuisine/:cuisine', routes.restaurant_cuisine)

// ROUTE 2 -- This query finds all yelps in a specific postal area 
app.get('/restaurants/location/:postal', routes.restaurant_postal)

// ROUTE 3 -- This query finds the zipcodes sorted by average yelp price range
app.get('/restaurants/zip', routes.restaurant_zip)

// ROUTE 4 -- This query finds the airbnbs sorted by price/# beds
app.get('/airbnbs/bed_price', routes.airbnb_bed_price)

// ROUTE 5 -- This query best airbnb rating to price ratio, as customers, we want this ratio to be high!
app.get('/airbnbs/rating_price', routes.airbnb_rating_price)

// ROUTE 6 -- This query selects airbnbs ordered by average nearby restaurant reviews. 
// It begins by finding a table with airbnbs joined on proximal yelp businesses, it then finds the 
// averages and sorts.
app.get('/airbnbs/restaurant_reviews', routes.airbnb_restaurant_reviews)

// ROUTE 7 -- This Query filters Airbnbs by having a Grocery store nearby.
app.get('airbnbs/grocery', routes.airbnb_grocery)

// ROUTE 8 -- This query find the Airbnbs sorted by proximity to closest Cuisine restaurant. It begins with a subquery
// to find Cuisine restaurants and then finds the closest Cuisine restaurent to each Airbnb and sorts the list 
// by this distance. 
// Example category is: Lebanese, Chinese, Indian, American, etc.
app.get('airbnbs/restaurants_close/:cuisine', routes.airbnb_restaurant_close)

// ROUTE 9 -- This query is to find the airbnb with the best host and most nearby restaurants, by count. It distinguishes best 
// host by super_host and host_acceptance_rate and returns the count of restaurants. 
app.get('airbnbs/best_overall', routes.airbnb_host_restaurants)

// ROUTE 10 -- This query is to find the airbnb with at least 1 Indian restaurant and one Convenience Store OR Grocery nearby 
// (within lat long diff of less than 62). It makes 3 subtables and finds the airbnbs that satisfy this condition, 
// along with the count of the number of yelp offerings. 
app.get('airbnbs/convenience_store_with_indian', routes.airbnb_convenience)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
