const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

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

// ********************************************
//                  ROUTE 0
// ********************************************
// ROUTE 0 -- get all restaurants 
// can optionally have fields like cuisine, name and stars (larger than or equal) 
async function restaurants(req, res) {
  const cuisine = req.query.cuisine ? req.query.cuisine : ""
  const name = req.query.name ? req.query.name : ""
  const stars = req.query.stars ? req.query.stars : 0
  if (stars > 0) {
    connection.query(`SELECT y.name FROM Yelp y JOIN Yelp_Categories c on y.business_id = c.business_id
    WHERE c.category LIKE '%${cuisine}%' and y.name LIKE '%${name}%' and y.stars => ${stars}`, function (error, results, fields) {
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

// ********************************************
//                  ROUTE 1 
// ********************************************
// ROUTE 1 -- This query finds all restaurants of a certain category
// Example category is: Lebanese, Chinese, Indian, American, etc.
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

// ********************************************
//                  ROUTE 2
// ********************************************
// ROUTE 2 -- This query finds all yelps in a specific postal area 
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

// ********************************************
//                  ROUTE 3
// ********************************************
// ROUTE 3 -- This query finds the zipcodes sorted by average yelp price range
// there is also the optional input of postal code to get the average price in that code
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

// ********************************************
//                  ROUTE 9
// ********************************************
// ROUTE 9 -- This query is to find the airbnb with the best host and most nearby restaurants, by count. It distinguishes best 
// host by super_host and host_acceptance_rate and returns the count of restaurants. 
// optionally the response time can also be queried
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
//                  ROUTE 10
// ********************************************
// ROUTE 10 -- This query is to find an airbnb with at least 1 Convenience Store OR Grocery nearby - then optionally you can add in another 
// such as indian
// (within lat long diff of less than 62). 
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