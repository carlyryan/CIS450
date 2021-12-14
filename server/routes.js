const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODOS
// TODO: add pagination (LIMIT, OFFSET)
// TODO: reduce number of fields returned by airbnbs_by_yelp 

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


/* /restaurants
Description: Gets Yelps with the option to filter by and sort by certain fields
Query Parameters:
  Category*
  Name*
  Stars*
  review_count*
  postal_code*
  is_open*
  sort*
Route Handler: restaurants(req, res)
Return Parameters: {results [{business_id, name, address, stars, postal_code, review_count}]}
 */
async function restaurants(req, res) {
  const category = req.query.category ? req.query.category : ""
  const name = req.query.name ? req.query.name : ""


  query_string = `SELECT DISTINCT y.business_id, y.name, y.address, y.stars, y.postal_code, y.review_count FROM Yelp y JOIN YelpCategories c on y.business_id = c.business_id
    WHERE c.category LIKE '%${category}%' AND y.name LIKE '%${name}%'`

  if (req.query.stars) query_string = query_string.concat(` AND y.stars >= ${req.query.stars}`)
  if (req.query.reviewCount) query_string = query_string.concat(` AND y.review_count >= ${req.query.reviewCount}`)
  if (req.query.postal_code) query_string = query_string.concat(` AND y.postal_code == ${req.query.postal_code}`)
  if (req.query.sort) query_string = query_string.concat(` ORDER BY y.${req.query.sort}`)

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// /restaurant/:business_id
// Description: Gets more detailed data about specific yelp
// Route Parameters: business_id
// Route Handler: restaurant(req, res)
// Return Parameters:  results {business_id, name, address, city, state, postal_code,
//        latitude, longitude, stars, review_count,  hours, restaurants_price_range2, by_appointment_only,
//        dogs_allowed, restaurants_delivery, 
//        wheelchair_accessible, restaurants_good_for_groups, outdoor_seating,
//        good_for_kids, happy_hour, alcohol,
//        mon_hours, tues_hours, wed_hours, thurs_hours, fri_hours,
//        sat_hours, sun_hours}
// HARD CODED city and state
async function restaurant(req, res) {
  business_id = req.params.business_id;

  query_string = `SELECT y.business_id, y.name, y.address, 'Austin' as city, 'TX' as state, y.postal_code, y.latitude, y.longitude, y.stars, 
  y.review_count, y.hours, y.restaurants_price_range2, y.by_appointment_only, 
  y.dogs_allowed, y.restaurants_delivery, 
  y.wheelchair_accessible, y.restaurants_good_for_groups, y.outdoor_seating, y.good_for_kids, y.happy_hour, y.alcohol,
  y.mon_hours, y.tues_hours, y.wed_hours, y.thurs_hours, y.fri_hours, y.sat_hours, y.sun_hours, y.romantic, y.intimate, y.classy, y.hipster
  FROM Yelp y 
  WHERE y.business_id LIKE '%${business_id}%'`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}
//TO DO add romantic.... etc for fields in the query

// TO DO add a route here and in the API specs that returns the list of categories for a business


// /restaurant_airbnbs/:business_id
// Description: Gets airbnbs around a specific yelp, sorted by distance, any filter that can be passed into the airbnb search can also be passed in here, the most pertinent filter though is max_miles, which defaults to 1.5
// Route Parameters:  (Filters)
// Query parameters: 
//       max_miles
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        postal_code, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_details, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable, bathrooms}]
async function restaurant_airbnbs(req, res) {
  business_id = req.params.business_id;
  const max_miles = req.query.max_miles ? req.query.max_miles : 1.5
  const room_type = req.query.room_type ? req.query.room_type : ""
  const is_instant_bookable = req.query.is_instant_bookable ? 'TRUE' : ""

  query_string = `SELECT ST_Distance_Sphere(point(y.longitude, y.latitude), point(a.longitude, a.latitude)) * .000621371192 as distance_miles, id, a.listing_url, a.name, a.description, a.neighborhood_overview, a.picture_url, a.host_id, 
  a.postal_code, a.latitude, a.longitude, a.property_type, a.room_type, 
  a.accommodates, a.bathrooms_details, a.bedrooms, a.beds, a.amenities, a.price, a.minimum_nights, a.maximum_nights, 
  a.number_of_reviews, a.review_scores_rating, a.instant_bookable, bathrooms
  FROM Airbnb a join Yelp y on ST_Distance_Sphere(point(y.longitude, y.latitude), point(a.longitude, a.latitude)) * .000621371192 < ${max_miles}
  WHERE y.business_id LIKE '%${business_id}%' and a.room_type LIKE '%${room_type}%' AND a.instant_bookable LIKE '%${is_instant_bookable}%'`

  //beds
  if (req.query.num_beds_lt) query_string = query_string.concat(` AND a.beds <= ${req.query.num_beds_lt}`)
  if (req.query.num_beds_gt) query_string = query_string.concat(` AND a.beds >= ${req.query.num_beds_gt}`)
  //stars
  if (req.query.stars_lt) query_string = query_string.concat(` AND a.review_scores_rating <= ${req.query.stars_lt}`)
  if (req.query.stars_gt) query_string = query_string.concat(` AND a.review_scores_rating >= ${req.query.stars_gt}`)
  //min/max nights
  if (req.query.minimum_nights) query_string = query_string.concat(` AND a.minimum_nights <= ${req.query.minimum_nights}`)
  if (req.query.maximum_nights) query_string = query_string.concat(` AND a.maximum_nights >= ${req.query.maximum_nights}`)
  // postal code 
  if (req.query.review_count) query_string = query_string.concat(` and a.numer_of_reviews >= ${req.query.review_count}`)
  if (req.query.postal_code) query_string = query_string.concat(` and a.postal_code = ${req.query.postal_code}`)


  // TODO: impopse a limit
  query_string = query_string.concat(` ORDER BY 1`)
  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });

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

// helper function to generate Airbnb query's where clause
function query_to_airbnb_where(query) {
  const room_type = query.room_type ? query.room_type : ""
  const is_instant_bookable = query.is_instant_bookable ? 'TRUE' : ""

  where_clause = `a.room_type LIKE '%${room_type}%' AND a.instant_bookable LIKE '%${is_instant_bookable}%'`

  //beds
  if (query.num_beds_lt) where_clause = where_clause.concat(` AND a.beds <= ${query.num_beds_lt}`)
  if (query.num_beds_gt) where_clause = where_clause.concat(` AND a.beds >= ${query.num_beds_gt}`)
  //stars
  if (query.stars_lt) where_clause = where_clause.concat(` AND a.review_scores_rating <= ${query.stars_lt}`)
  if (query.stars_gt) where_clause = where_clause.concat(` AND a.review_scores_rating >= ${query.stars_gt}`)
  //min/max nights
  if (query.minimum_nights) where_clause = where_clause.concat(` AND a.minimum_nights <= ${query.minimum_nights}`)
  if (query.maximum_nights) where_clause = where_clause.concat(` AND a.maximum_nights >= ${query.maximum_nights}`)
  // postal code 
  if (query.review_count) where_clause = where_clause.concat(` and a.number_of_reviews >= ${query.review_count}`)
  if (query.postal_code) where_clause = where_clause.concat(` and a.postal_code = ${query.postal_code}`)

  return where_clause
}


// /airbnbs/
// Query Parameters:
// num_beds_lt*
// num_beds_gt*
// room_type*
// stars_lt*  //review_scores_rating
// stars_gt*  //review_scores_rating
// minimum_nights*
// maximum_nights*
// postal_code*
// review_count* //numer_of_reviews
// is_instant_bookable*
// host_acceptance_rate*
// sort*
// sort_order [ASC|DESC]*
// Route Handler: airbnbs(req, res)
// Description: Gets listings for airbnbs based on certain filter/requirements
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        postal_code, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_details, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable, bathrooms}]
async function airbnbs(req, res) {
  sort_order = req.query.sort_order ? req.query.sort_order : 'ASC';

  where_clause = query_to_airbnb_where(req.query);

  query_string = `SELECT id, a.listing_url, a.name, a.description, a.neighborhood_overview, a.picture_url, a.host_id, 
  a.postal_code, a.latitude, a.longitude, a.property_type, a.room_type, 
  a.accommodates, a.bathrooms_details, a.bedrooms, a.beds, a.amenities, a.price, a.minimum_nights, a.maximum_nights, 
  a.number_of_reviews, a.review_scores_rating, a.instant_bookable, bathrooms
  FROM Airbnb a join Host h on a.host_id = h.host_id
  WHERE ${where_clause}`

  //beds
  if (req.query.num_beds_lt) query_string = query_string.concat(` AND a.beds <= ${req.query.num_beds_lt}`)
  if (req.query.num_beds_gt) query_string = query_string.concat(` AND a.beds >= ${req.query.num_beds_gt}`)
  //stars
  if (req.query.stars_lt) query_string = query_string.concat(` AND a.review_scores_rating <= ${req.query.stars_lt}`)
  if (req.query.stars_gt) query_string = query_string.concat(` AND a.review_scores_rating >= ${req.query.stars_gt}`)
  //min/max nights
  if (req.query.minimum_nights) query_string = query_string.concat(` AND a.minimum_nights <= ${req.query.minimum_nights}`)
  if (req.query.maximum_nights) query_string = query_string.concat(` AND a.maximum_nights >= ${req.query.maximum_nights}`)
  // postal code 
  if (req.query.review_count) query_string = query_string.concat(` and a.number_of_reviews >= ${req.query.review_count}`)
  if (req.query.postal_code) query_string = query_string.concat(` and a.postal_code = ${req.query.postal_code}`)

  if (req.query.sort) query_string = query_string.concat(` ORDER BY a.${req.query.sort}`)
  if (req.query.sort) query_string = query_string.concat(` ORDER BY a.${sort} ${sort_order}`)

  //res.send(query_string)
  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// /airbnbs_by_yelp/
// Query Parameters: (In addition to those of /airbnbs)
//    near_cuisine*
//    restaurants_within_miles* (num miles)
//    min_restaurant_count
//    nearby_restaurant_rating_ratio_lt*
//    Sort* (same as airbnbs, with additional options “avg_stars”)
// Route Handler: airbnb_yelps(req, res)
// Description: Filter data on Airbnbs based on qualities of nearby amenities such as avg restaurant rating or being close to a grocery store.
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        neighbourhood_cleansed, neighbourhood_group_cleansed, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_text, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable, avg_proximate_restaurant_rating, num_restaurants_proximate}]
async function airbnbs_by_yelp(req, res) {
  sort_order = req.query.sort_order ? req.query.sort_order : 'ASC';
  where_clause = query_to_airbnb_where(req.query);

  range = req.query.restaurants_within_miles ? req.query.restaurants_within_miles : 1.5;

  if (req.query.near_cuisine) {
    where_clause = where_clause.concat(` AND YC.category='${req.query.near_cuisine}'`);
  }

  sort_clause = '';
  if (req.query.sort) {
    sort_clause = sort_clause.concat('ORDER BY ');
    if (req.query.sort.includes('restaurant')) {
      sort_clause = sort_clause.concat('T2.');
    } else {
      sort_clause = sort_clause.concat('A.');
    }
    sort_clause = sort_clause.concat(req.query.sort + ' ' + sort_order);
  }

  // console.log('ASDF');
  // console.log(req.query.min_restaurant_count);
  // console.log(`asdf ${'asdf' ? 0 : ''}`);

  query_string = `WITH T1 as ( # nearby restaurants
        SELECT DISTINCT a.id as airbnb_id, Y.business_id, Y.stars as yelp_stars
        FROM Airbnb a
                JOIN Yelp Y
                    JOIN YelpCategories YC on Y.business_id = YC.business_id
        WHERE ST_Distance_Sphere(POINT(a.longitude, a.latitude), POINT(Y.longitude, Y.latitude)) < ${range} * 1600 AND
              ${where_clause}
    ), T2 as ( # average across nearby restaurants
        SELECT airbnb_id, AVG(yelp_stars) as avg_proximate_restaurant_rating, COUNT(business_id) as num_restaurants_proximate
        FROM T1
        GROUP BY airbnb_id
        ${req.query.min_restaurant_count ? `HAVING yelp_count >= ${req.query.min_restaurant_count}` : ''}
    )
    SELECT *
    FROM Airbnb A JOIN T2 ON A.id = T2.airbnb_id
    ${req.query.nearby_restaurant_rating_ratio_lt ? `WHERE T2.avg_proximate_restaurant_rating>=${req.query.nearby_restaurant_rating_ratio_lt}` : ''}
    ${sort_clause};` // TODO: generify sort

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// /airbnb/:listing_id
// Description: Gets more detailed data about specific airbnb
// Route Parameters: listing_id
// Route Handler: airbnb(req, res)
// Return Parameters: [result {​​id, listing_url, name, description,
//        neighborhood_overview, picture_url, host_id
//        postal_code, latitude,
//        longitude, property_type, room_type, accommodates,
//        bathrooms_details, bedrooms, beds, amenities, price,
// minimum_nights, maximum_nights, number_of_reviews, review_scores_rating, instant_bookable, bathrooms}]
async function airbnb(req, res) {
  listing_id = req.params.listing_id;

  query_string = `SELECT id, a.listing_url, a.name, a.description, a.neighborhood_overview, a.picture_url, a.host_id, 
  a.postal_code, a.latitude, a.longitude, a.property_type, a.room_type, 
  a.accommodates, a.bathrooms_details, a.bedrooms, a.beds, a.amenities, a.price, a.minimum_nights, a.maximum_nights, 
  a.number_of_reviews, a.review_scores_rating, a.instant_bookable, bathrooms
  FROM Airbnb a join Host h on a.host_id = h.host_id
  WHERE a.id LIKE '%${listing_id}%'`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
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

  query_string = `SELECT host_id, h.host_url, h.host_name, h.host_since, h.host_location, h.
  host_about, h.host_response_time, h.host_response_rate, h.host_acceptance_rate, h.
  host_is_superhost, h.host_neighbourhood, h. Host_total_listings_count, h.host_avg_airbnb_rating, h.cumulative_avg_hosting_rating
  FROM Airbnb a join Host h on a.host_id = h.host_id
  WHERE a.id LIKE '%${listing_id}%'`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });

}

// /hosts_airbnb_list/:hostid
// Description: return airbnbs for a specific host 
// Route Handler: hosts_airbnb_list(req, res)
// Return Parameters: [result {id, name, listing_url, postal_code}]
async function hosts_airbnb_list(req, res) {
  hostid = req.params.hostid

  query_string = `SELECT a.id, a.name, a.listing_url, a.postal_code
  FROM Airbnb a join Host h on a.host_id = h.host_id
  WHERE h.host_id LIKE '%${hostid}%'`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });

}

// ********************************************
//             ZIP CODE STUFF
// ********************************************

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
  // check for query filters
  var filters = ['TRUE']
  if (req.query.category) {
    filters.push(`YC.category='${req.query.category}'`);
  }
  if (req.query.stars) {
    filters.push(`Y.stars>=${req.query.stars}`);
  }
  if (req.query.review_count) {
    filters.push(`Y.review_count>=${req.query.review_count}`);
  }

  where_clause = filters.join(' AND ')

  query_string = `
  SELECT postal_code, COUNT(DISTINCT Y.business_id) as criterion
  FROM Yelp Y JOIN YelpReviews YR on Y.business_id = YR.business_id
            JOIN YelpCategories YC on Y.business_id = YC.business_id
  WHERE ${where_clause}
  GROUP BY postal_code
  ORDER BY criterion DESC;`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// /airbnb_zip/
// Description: Computes a criterion on codes based on airbnbs in the area; sort
// Query Parameters:
// Stars*
// ReviewCount*
// Superhost_Hosted*
// Criterion: [count, avg_price, review_count]
async function airbnb_zip(req, res) {
  // check for query filters
  var filters = ['TRUE']
  if (req.query.superhost) {
    filters.push(`H.host_is_superhost = 'TRUE'`);
  }
  if (req.query.rating) {
    filters.push(`A.review_scores_rating>=${req.query.rating}`);
  }
  if (req.query.review_count) {
    filters.push(`A.number_of_reviews>=${req.query.review_count}`);
  }

  // check criterion
  agg_string = 'COUNT(*) as criterion'
  if (req.query.criterion == 'avg_rating') {
    agg_string = 'AVG(A.review_scores_rating) as criterion';
  } else if (req.query.criterion == 'avg_price') {
    agg_string = 'AVG(A.price) as criterion';
  }


  where_clause = filters.join(' AND ')

  query_string = `
  SELECT postal_code, ${agg_string}
  FROM Airbnb A JOIN Host H on H.host_id = A.host_id
  WHERE ${where_clause}
  GROUP BY postal_code
  ORDER BY criterion DESC;`

  connection.query(query_string, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}





/* // ********************************************
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
} */



/* 
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
} */


module.exports = {
  hello,
  restaurants,
  restaurant,
  restaurant_airbnbs,
  restaurants_by_review,
  airbnbs,
  airbnbs_by_yelp,
  airbnb,
  airbnb_hosts,
  hosts_airbnb_list,
  restaurant_zip,
  airbnb_zip
}