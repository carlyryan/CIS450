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
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
  // a GET request to /hello?name=Steve
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
  } else {
    res.send(`Hello! Welcome to the FIFA server!`)
  }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
  const colors = ['red', 'blue']
  const jersey_number = Math.floor(Math.random() * 20) + 1
  const name = req.query.name ? req.query.name : "player"

  if (req.params.choice === 'number') {
    // TODO: TASK 1: inspect for issues and correct 
    res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
  } else if (req.params.choice === 'color') {
    var lucky_color_index = Math.floor(Math.random() * 2);
    // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
    res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
  } else {
    // TODO: TASK 3: inspect for issues and correct
    res.json({ message: `Hello, ${name}, we like your jersey!` })
  }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function restaurant_cuisine(req, res) {
  const cuisine = req.query.id;

}


module.exports = {
}