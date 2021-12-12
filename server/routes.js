const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// LINK to specification:
// https://docs.google.com/document/d/1BYqQRYXODskvQFh68G1cgsV5tdOPAJOa6QkkvhhIkwM/edit?usp=sharing

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect();
// ********************************************
//            HELLO ROUTE 
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
  // a GET request to /hello?name=Steve
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the Stay Cozy with Good Eats server! We are so glad to have you ---- Carly, Karthik, Daniel and Andrew:)`)
  } else {
    res.send(`Hello! Welcome to the Stay Cozy with Good Eats server! We are so glad to have you ---- Carly, Karthik, Daniel and Andrew:)`)
  }
}

//
// ********************************************
//                  Yelp
// ********************************************


// ROUTE 0 -- get all restaurants 
// can optionally have fields like cuisine, name and stars (larger than or equal) 
async function restaurants(req, res) {
  const cuisine = req.query.cuisine ? req.query.cuisine : ""
  const name = req.query.name ? req.query.name : ""
  const stars = req.query.stars ? req.query.stars : 0

  // TODO: Add sort
  // TODO: add all the filters from specification 
  if (stars > 0) {
    connection.query(`SELECT y.name FROM Yelp y JOIN Yelp_Categories c on y.business_id = c.business_id
    WHERE c.category LIKE '%${cuisine}%' and y.name LIKE '%${name}%' and y.stars >= ${stars}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  } else {
    //res.send(`Hello! ${req.query.stars} Welcome to the Stay Cozy with Good Eats server! We are so glad to have you ---- Carly, Karthik, Daniel and Andrew:)`)
    connection.query(`SELECT y.name FROM Yelp y JOIN Yelp_Categories c on y.business_id = c.business_id
    WHERE c.category LIKE '${cuisine}' and y.name LIKE '${name}'`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
}

// /restaurant/:business_id
// Description: Gets more detailed data about specific yelp
// Route Parameters: business_id
// Route Handler: restaurant(req, res)
// Return Parameters:  results {business_id, name, address, city, state, postal_code,
//        latitude, longitude, stars, review_count, attributes,
//        categories, hours, restaurants_price_range2, by_appointment_only,
//        dogs_allowed, restaurants_delivery, restaurants_take_out,
//        wheelchair_accessible, restaurants_good_for_groups, outdoor_seating,
//        noise_level, ambience, good_for_kids, happy_hour, alcohol,
//        mon_hours, tues_hours, wed_hours, thurs_hours, fri_hours,
//        sat_hours, sun_hours}
async function restaurant(req, res) {
  business_id = req.params.business_id;
  // TODO
}

// /restaurant_airbnbs/:business_id
// Description: Gets airbnbs around a specific yelp, sorted by distance, based on certain filters
// Route Parameters:  (Filters)
// (Same as airbnbs route)
async function restaurant_airbnbs(req, res) {
}


// /restaurants_by_review
// Description: Finds restaurants based on word mentions (e.g. food name)
// Query Parameters:
// All the ones from /restaurants +
// Keyword
async function restaurants_by_review(req, res) {
}


// ********************************************
//                AIRBNB
// ********************************************


// /airbnbs/
// Query Parameters:
// Num_beds_lt*
// Num_beds_gt*
// room_type*
// Stars_lt*
// Stars_gt*
// minimum_nights*
// maximum_nights*
// Postal_Code*
// ReviewCount*
// is_instant_bookable*
// host_acceptance_rate*
// Sort*
// Route Handler: airbnbs(req, res)
// Description: Gets listings for airbnbs based on certain filter/requirements
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        neighbourhood_cleansed, neighbourhood_group_cleansed, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_text, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable}]
async function airbnbs(req, res) {
}

// /airbnbs_by_yelp/
// Query Parameters: (In addition to those of /airbnbs)
// near_cuisine*
// nearby_restaurant_rating_ratio_lt*
// nearby_restaurant_rating_ratio_rt*
// postal_code*
// restaurants_within_miles* (num miles)
// Sort*
// Route Handler: airbnb_yelps(req, res)
// Description: Filter data on Airbnbs based on qualities of nearby amenities such as avg restaurant rating or being close to a grocery store.
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        neighbourhood_cleansed, neighbourhood_group_cleansed, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_text, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable, close_to_nearby_grocery_store, near_cuisine, proximate_restaurant_rating, num_restaurants_proximate}]
async function airbnbs_by_yelp(req, res) {
}

// /airbnb/:listing_id
// Description: Gets more detailed data about specific airbnb
// Route Parameters: listing_id
// Route Handler: airbnb(req, res)
// Return Parameters:  result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        neighbourhood_cleansed, neighbourhood_group_cleansed, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_text, bedrooms, beds, amenities, price,
//        minimum_nights, maximum_nights, number_of_reviews, review_scores_rating,
//        review_scores_cleanliness, review_scores_checkin,
//        review_scores_communication, review_scores_location, instant_bookable}
async function airbnbs_by_yelp(req, res) {

}

// /airbnb/:listing_id
// Description: Gets more detailed data about specific airbnb
// Route Parameters: listing_id
// Route Handler: airbnb(req, res)
// Return Parameters:  result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        neighbourhood_cleansed, neighbourhood_group_cleansed, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_text, bedrooms, beds, amenities, price,
//        minimum_nights, maximum_nights, number_of_reviews, review_scores_rating,
//        review_scores_cleanliness, review_scores_checkin,
//        review_scores_communication, review_scores_location, instant_bookable}
async function airbnb(req, res) {

}

// /airbnb_hosts/:hostid
// Description: Get information about a specific host with joined attributes based on their properties
// Route Handler: airbnb_host(req, res)
// Return Parameters: [result {host_id, host_url,
//        host_name, host_since, host_location, host_about,
//        host_response_time, host_response_rate, host_acceptance_rate,
//        host_is_superhost,
//        host_neighbourhood, 
// Host_total_listings_count, host_avg_airbnb_rating, list_of_airbnbs: [...], cumulative_avg_hosting_rating}]
async function airbnb_hosts(req, res) {
  hostid = req.params.hostid
}


// ********************************************
//             ZIP CODE STUFF
// ********************************************
// ROUTE 3 -- This query finds the zipcodes sorted by average yelp price range
// there is also the optional input of postal code to get the average price in that code

// /restaurant_zip/
// Description: Computes a criterion on codes based on yelps in the area; sort
// Query Parameters:
// Category*
// Stars*
// ReviewCount*
// Criterion: [count, avg_price, avg)review,, number of mentions of word ___]
// Route Handler: restaurant_zip(req, res)
// Return Parameters: {results [{postal_code (string), criterion (float)}]}
// Expected Output Behaviour:
// Return an array of postal codes and the specific criterion requested, over yelps filtered by the specified query parameters

// TODO: extend based on specification (add filters, additional criterion)
async function restaurant_zip(req, res) {
  if (req.query.postal && !isNaN(req.query.postal)) {
    connection.query(`SELECT postal_code, AVG(RestaurantsPriceRange2) as avg_price
    FROM Yelp
    WHERE postal_code = '${req.query.postal}'
    ORDER BY avg_price`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
  else {
    connection.query(`SELECT postal_code, AVG(RestaurantsPriceRange2) as avg_price
    FROM Yelp
    GROUP BY postal_code
    ORDER BY avg_price`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
}

// /airbnb_zip/
// Description: Computes a criterion on codes based on airbnbs in the area; sort
// Query Parameters:
// Stars*
// ReviewCount*
// Superhost_Hosted*
// Criterion: [count, avg_price, review_count]
async function airbnb_zip(req, res) {

}





// ********************************************
//                  ROUTE 9
// ********************************************
// ROUTE 9 -- This query is to find the airbnb with the best host and most nearby restaurants, by count. It distinguishes best 
// host by super_host and host_acceptance_rate and returns the count of restaurants. 
// optionally the response time can also be queried

// TODO: idrk how this will be used?
async function airbnb_host_restaurants(req, res) {
  if (req.query.response_time && !isNaN(req.query.response_time)) {
    connection.query(`with Airbnb_to_host as (SELECT a.id, h.host_acceptance_rate
      FROM Airbnb a join Host h on a.host_id = h.host_id
      where h.host_is_superhost = 'True' and h.host_response_time = '${req.query.response_time}')
  Select a.id, a.name, host_acceptance_rate, COUNT(distinct y.business_id) as num_restaurants_nearby
  FROM Airbnb_to_host ah
      JOIN Airbnb a on ah.id = a.id
      JOIN Yelp y
      JOIN Yelp_Categories yc on y.business_id = yc.business_id
  WHERE yc.category = 'Restaurants'
    AND ABS(y.longitude - a.longitude) <= 0.05 and ABS(y.latitude - a.latitude) <= 0.05
  GROUP BY 1, 2, 3;`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }

  else {
    connection.query(`with Airbnb_to_host as (SELECT a.id, h.host_acceptance_rate
      FROM Airbnb a join Host h on a.host_id = h.host_id
      where h.host_is_superhost = 'True')
  Select a.id, a.name, host_acceptance_rate, COUNT(distinct y.business_id) as num_restaurants_nearby
  FROM Airbnb_to_host ah
      JOIN Airbnb a on ah.id = a.id
      JOIN Yelp y
      JOIN Yelp_Categories yc on y.business_id = yc.business_id
  WHERE yc.category = 'Restaurants'
    AND ABS(y.longitude - a.longitude) <= 0.05 and ABS(y.latitude - a.latitude) <= 0.05
  GROUP BY 1, 2, 3;`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
}




// ********************************************
//       MARKED FOR DELETION
//   (due to merging/doesn't fit in application)
// ********************************************





// NOTE: will be merged into one airbnb route
// ********************************************
//                  ROUTE 4
// ********************************************
async function airbnb_bed_price(req, res) {
}

// ********************************************
//                  ROUTE 5
// ********************************************
async function airbnb_rating_price(req, res) {
}

// ********************************************
//                  ROUTE 6
// ********************************************
async function airbnb_restaurant_reviews(req, res) {
}

// ********************************************
//                  ROUTE 7
// ********************************************
async function airbnb_grocery(req, res) {
}

// ********************************************
//                  ROUTE 8
// ********************************************
async function airbnb_restaurant_close(req, res) {
}

// ROUTE 1 -- This query finds all restaurants of a certain category
// Example category is: Lebanese, Chinese, Indian, American, etc.
// TODO: DELETE. This will be encompassed by first route
async function restaurant_cuisine(req, res) {
  const cuisine = req.params.cuisine ? req.params.cuisine : 'Restaurant'
  connection.query(`SELECT y.name, c.category, y.address
      FROM Yelp y JOIN Yelp_Categories c on y.business_id = c.business_id
      WHERE c.category = '${cuisine}'`, function (error, results, fields) {

    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// ROUTE 2 -- This query finds all yelps in a specific postal area 

// TODO: DELETE. This will be merged into Route 1
async function restaurant_postal(req, res) {
  const postal = req.params.postal ? req.params.postal : ''
  connection.query(`SELECT y.name, y.address,  y.postal_code
      FROM Yelp y
      WHERE y.postal_code LIKE '%${postal}%'`, function (error, results, fields) {

    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}
// ROUTE 10 -- This query is to find an airbnb with at least 1 Convenience Store OR Grocery nearby - then optionally you can add in another 
// such as indian
// (within lat long diff of less than 62). 
// TODO: delte since we don't have grocery stores :
async function airbnb_convenience(req, res) {
  if (req.query.other_category && !isNaN(req.query.other_category)) {
    connection.query(`with Yelp_groceries as (SELECT y.business_id, y.name, y.latitude, y.longitude
      FROM Yelp y
             NATURAL JOIN Yelp_Categories c
      WHERE c.category = 'Grocery'),
      Yelp_convenience as (SELECT y.business_id, y.name, y.latitude, y.longitude
      FROM Yelp y
             NATURAL JOIN Yelp_Categories c
      WHERE c.category = 'Convenience Stores'),
      Yelp_other as (SELECT y.business_id, y.name, y.latitude, y.longitude
      FROM Yelp y
             NATURAL JOIN Yelp_Categories c
      WHERE c.category = '${req.query.other_category}')
  Select a.id, a.name, count(distinct g.business_id), count(distinct c.business_id), count(distinct o.business_id)
  FROM Airbnb a
      JOIN Yelp_groceries g
      JOIN Yelp_convenience c
      JOIN Yelp_other o
  WHERE (ABS(o.longitude - a.longitude) <= 0.01 AND ABS(o.latitude - a.latitude)  <= 0.01)
      AND (ABS(g.longitude - a.longitude) <= 0.01 AND ABS(g.latitude - a.latitude) <= 0.01)
      OR (ABS(c.longitude - a.longitude) <= 0.01 AND ABS(c.latitude - a.latitude)  <= 0.01)
  GROUP BY 1, 2`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
  else {
    connection.query(`with Yelp_groceries as (SELECT y.business_id, y.name, y.latitude, y.longitude
      FROM Yelp y
             NATURAL JOIN Yelp_Categories c
      WHERE c.category = 'Grocery'),
      Yelp_convenience as (SELECT y.business_id, y.name, y.latitude, y.longitude
      FROM Yelp y
             NATURAL JOIN Yelp_Categories c
      WHERE c.category = 'Convenience Stores')
  Select a.id, a.name, count(distinct g.business_id), count(distinct c.business_id)
  FROM Airbnb a
      JOIN Yelp_groceries g
      JOIN Yelp_convenience c
  WHERE (ABS(g.longitude - a.longitude) <= 0.01 AND ABS(g.latitude - a.latitude) <= 0.01)
      OR (ABS(c.longitude - a.longitude) <= 0.01 AND ABS(c.latitude - a.latitude)  <= 0.01)
  GROUP BY 1, 2`, function (error, results, fields) {

      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
}


module.exports = {
  hello,
  restaurants,
  restaurant_cuisine,
  restaurant_postal,
  restaurant_zip,
  airbnb_bed_price,
  airbnb_rating_price,
  airbnb_restaurant_reviews,
  airbnb_grocery,
  airbnb_restaurant_close,
  airbnb_host_restaurants,
  airbnb_convenience
}