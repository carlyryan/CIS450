const express = require('express');
const mysql = require('mysql');

const routes = require('./routes')
const config = require('./config.json')

const app = express();

// Route 1 - register as GET 
app.get('/hello/:name', routes.hello)

// ********************************************
//                  Yelp
// ********************************************

app.get('/restaurants', routes.restaurants)

//app.get('/restaurants_by_review', routes.restaurant_cuisine) --> what is this handler?

app.get('/restaurant/:business_id', routes.restaurant)

app.get('/restaurant_airbnbs/:business_id', routes.restaurant_airbnbs)

app.get('/restaurants_by_review', routes.restaurants_by_review)

// ********************************************
//                AIRBNB
// ********************************************

app.get('/airbnbs/', routes.airbnbs)

app.get('/airbnbs_by_yelp/', routes.airbnbs_by_yelp)

app.get('/airbnb/:listing_id', routes.airbnb)

app.get('/airbnb_hosts/:hostid', routes.airbnb_hosts)

app.get('/hosts_airbnb_list/:hostid', routes.hosts_airbnb_list)
// ********************************************
//             ZIP CODE STUFF
// ********************************************

app.get('/restaurant_zip/', routes.restaurant_zip)

app.get('/airbnb_zip/', routes.airbnb_zip)



app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
