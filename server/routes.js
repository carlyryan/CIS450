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
async function all_matches(req, res) {
  // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
  // We have partially implemented this function for you to 
  // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
  // we didn't specify this default value for league, and you could change it if you want! 
  // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
  const league = req.params.league;
  const pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;
  // use this league encoding in your query to furnish the correct results

  if (req.query.page && !isNaN(req.query.page)) {
    // This is the case where page is defined.
    // The SQL schema has the attribute OverallRating, but modify it to match spec! 
    // TODO: query and return results here:
    const offset = pagesize * (req.query.page - 1);
    connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${offset}, ${pagesize}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  } else {
    // we have implemented this for you to see how to return results by querying the database
    connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  }
}

// Route 4 (handler)
async function all_players(req, res) {
  // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
  const page = req.query.page;
  const pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;

  if (page && !isNaN(page)) {
    const offset = pagesize * (page - 1);
    connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name
        LIMIT ${offset}, ${pagesize}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    });
  } else {
    connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name`, function (error, results, fields) {
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
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
  // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
  const id = req.query.id;
  if (isNaN(id)) {
    res.json({ error: "id not valid" });
  } else {
    connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
          FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals,
          HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals,
          ShotsH AS ShotsHome, ShotsA as ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome,
          ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway,
          CornersH AS CornersHome, CornersA AS CornersAway, YellowCardsH AS YCHome, 
          YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
        FROM Matches
        WHERE MatchId = ${id}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  }
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
  const id = req.query.id;
  if (isNaN(id)) {
    res.json({ error: "id not valid" });
    return;
  }
  // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
  connection.query(`
      SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, 
        Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, 
        ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause,
        GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes, NPassing,
        NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
      FROM Players
      WHERE PlayerId = ${id}`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else {
      results.map(x => {
        if (x.BestPosition == 'GK') {
          delete x['NPassing'];
          delete x['NBallControl'];
          delete x['NAdjustedAgility'];
          delete x['NStamina'];
          delete x['NStrength'];
          delete x['NPositioning'];
        } else {
          delete x['GKPenalties'];
          delete x['GKDiving'];
          delete x['GKHandling'];
          delete x['GKKicking'];
          delete x['GKPositioning'];
          delete x['GKReflexes'];
        }
      });
      res.json({ results: results })
    }
  });
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
  // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search
  // query to substrings, not just the entire string
  const home = req.query.Home ? req.query.Home : '';
  const away = req.query.Away ? req.query.Away : '';
  const page = req.query.page;
  const pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;

  if (page && !isNaN(page)) {
    const offset = pagesize * (page - 1);
    connection.query(`
      SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
        FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
      FROM Matches
      WHERE HomeTeam LIKE '%${home}%'
        AND AwayTeam LIKE '%${away}%'
      ORDER BY Home, Away
      LIMIT ${offset}, ${pagesize}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  } else {
    connection.query(`
      SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
        FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
      FROM Matches
      WHERE HomeTeam LIKE '%${home}%'
        AND AwayTeam LIKE '%${away}%'
      ORDER BY Home, Away`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  }
}

// Route 8 (handler)
async function search_players(req, res) {
  // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
  // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
  const params = req.query;
  const name = params.Name ? params.Name : '';
  const nat = params.Nationality ? params.Nationality : '';
  const club = params.Club ? params.Club : '';
  const lRating = params.RatingLow && !isNaN(params.RatingLow) ? params.RatingLow : 0;
  const rRating = params.RatingHigh && !isNaN(params.RatingHigh) ? params.RatingHigh : 100;
  const pLow = params.PotentialLow && !isNaN(params.PotentialLow) ? params.PotentialLow : 0;
  const pHigh = params.PotentialHigh && !isNaN(params.PotentialHigh) ? params.PotentialHigh : 100;

  const page = req.query.page;
  const pagesize = req.query.pagesize && !isNaN(req.query.pagesize) ? req.query.pagesize : 10;

  if (page && !isNaN(page)) {
    const offset = pagesize * (page - 1);
    connection.query(`
      SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
      FROM Players
      WHERE Name LIKE '%${name}%'
        AND Nationality LIKE '%${nat}%'
        AND Club LIKE '%${club}%'
        AND Potential >= ${pLow} AND Potential <= ${pHigh}
        AND OverallRating >= ${lRating} AND OverallRating <= ${rRating}
      ORDER BY Name
      LIMIT ${offset}, ${pagesize}`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  } else {
    connection.query(`
      SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
      FROM Players
      WHERE Name LIKE '%${name}%'
        AND Nationality LIKE '%${nat}%'
        AND Club LIKE '%${club}%'
        AND Potential >= ${pLow} AND Potential <= ${pHigh}
        AND OverallRating >= ${lRating} AND OverallRating <= ${rRating}
      ORDER BY Name`, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  }
}

module.exports = {
  hello,
  jersey,
  all_matches,
  all_players,
  match,
  player,
  search_matches,
  search_players
}