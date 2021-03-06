
## Simple queries 

```SQL
-- This query finds all Lebanese restaurants

SELECT *
FROM Yelp y JOIN Yelp_Categories c on y.business_id = c.business_id
WHERE c.category = 'Lebanese';


-- This query finds all yelps in a specific postal area

SELECT *
FROM Yelp y
WHERE y.postal_code = 78748;


-- This query finds the zipcodes sorted by average yelp price range

SELECT postal_code, AVG(RestaurantsPriceRange2) as avg_price
FROM Yelp
GROUP BY postal_code
ORDER BY avg_price;


-- This query finds the airbnbs sorted by price/# beds

SELECT *, price/beds as price_per_bed
FROM Airbnb
WHERE beds > 0
ORDER BY price/beds;


-- This query best airbnb rating to price ratio, as customers, we want this ratio to be high!
SELECT a.name,
    ROUND(((a.review_scores_rating)/(a.price)*10000), 3) as ratio
FROM Airbnb a
order by 2 desc;


-- This query finds the best yelp rating to price ratio, as customers, we want this ratio to be high!
SELECT y.name,
    ROUND((y.stars)/(y.RestaurantsPriceRange2), 3) as ratio
FROM Yelp y
order by 2 desc;
```

## Complex queries
```SQL
-- This query selects airbnbs ordered by average nearby restaurant reviews. It begins by finding a table with airbnbs joined
-- on proximal yelp businesses, it then finds the averages and sorts.
WITH av_ratings AS (
    SELECT a.id as airbnb_id, y.stars, y.review_count
    FROM Airbnb a JOIN Yelp y on (ABS(y.longitude - a.longitude) <= 0.01 AND
                                  ABS(y.latitude - a.latitude) <= 0.01) # one degree of longitude is about 60-70 miles
)
SELECT airbnb_id, AVG(stars) as average_rating
FROM av_ratings
GROUP BY airbnb_id
ORDER BY average_rating DESC
LIMIT 10;


-- This Query filters Airbnbs by having a Grocery store nearby.
SELECT *
FROM Airbnb a
WHERE EXISTS (
    SELECT *
    FROM Yelp y NATURAL JOIN Yelp_Categories
    WHERE category = "Grocery" AND
          ABS(y.longitude - a.longitude) <= 0.005 AND
          ABS(y.latitude - a.latitude) <= 0.005
);


-- This query find the Airbnbs sorted by proximity to closest Lebanese restaurant. It begins with a subquery
-- to find Lebanese restaurants and then finds the closest Lebanese restaurent to each Airbnb and sorts the list 
-- by this distance. 

WITH lebanese AS (
    SELECT *
    FROM Yelp y
           NATURAL JOIN Yelp_Categories c
    WHERE c.category = 'Lebanese'
)
SELECT *
FROM Airbnb a
         JOIN lebanese l
WHERE ABS(l.longitude - a.longitude) + ABS(l.latitude + a.latitude) <= ALL (
    SELECT ABS(l2.longitude - a.longitude) + ABS(l2.latitude + a.latitude)
    FROM lebanese l2
)
ORDER BY ABS(l.longitude - a.longitude) + ABS(l.latitude + a.latitude);


-- This query is to find the airbnb with the best host and most nearby restaurants, by count. It distinguishes best 
-- host by super_host and host_acceptance_rate and returns the count of restaurants. 

with Airbnb_to_host as (SELECT a.id, h.host_acceptance_rate
    FROM Airbnb a join Host h on a.host_id = h.host_id
    where h.host_is_superhost = 'True')
Select a.id, a.name, host_acceptance_rate, COUNT(distinct y.business_id) as num_restaurants_nearby
FROM Airbnb_to_host ah
    JOIN Airbnb a on ah.id = a.id
    JOIN Yelp y
    JOIN Yelp_Categories yc on y.business_id = yc.business_id
WHERE yc.category = 'Restaurants'
  AND ABS(y.longitude - a.longitude) <= 0.05 and ABS(y.latitude - a.latitude) <= 0.05
GROUP BY 1, 2, 3;

-- This query is to find the airbnb with at least 1 Indian restaurant and one Convenience Store OR Grocery nearby 
-- (within lat long diff of less than 62). It makes 3 subtables and finds the airbnbs that satisfy this condition, 
-- along with the count of the number of yelp offerings. 

with Yelp_groceries as (SELECT y.business_id, y.name, y.latitude, y.longitude
    FROM Yelp y
           NATURAL JOIN Yelp_Categories c
    WHERE c.category = 'Grocery'),
    Yelp_convenience as (SELECT y.business_id, y.name, y.latitude, y.longitude
    FROM Yelp y
           NATURAL JOIN Yelp_Categories c
    WHERE c.category = 'Convenience Stores'),
    Yelp_indian as (SELECT y.business_id, y.name, y.latitude, y.longitude
    FROM Yelp y
           NATURAL JOIN Yelp_Categories c
    WHERE c.category = 'Indian')
Select a.id, a.name, count(distinct g.business_id), count(distinct c.business_id), count(distinct i.business_id)
FROM Airbnb a
    JOIN Yelp_groceries g
    JOIN Yelp_convenience c
    JOIN Yelp_indian i
WHERE (ABS(i.longitude - a.longitude) <= 0.01 AND ABS(i.latitude - a.latitude)  <= 0.01)
    AND (ABS(g.longitude - a.longitude) <= 0.01 AND ABS(g.latitude - a.latitude) <= 0.01)
    OR (ABS(c.longitude - a.longitude) <= 0.01 AND ABS(c.latitude - a.latitude)  <= 0.01)
GROUP BY 1, 2;
