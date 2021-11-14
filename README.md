# CIS450
Stay Cozy with the Good Eats

# Description
Our idea is to merge the Yelp and Airbnb datasets to help food-loving individuals make a more informed decision about where they want to stay in NYC. Our web app will combine information about the restaurants near each airbnb or output areas with the best airbnbs based on certain criteria. Users would be able to search airbnb locations and see the average rating or price metrics near that spot. Perhaps we would also create an interactive map or let users search by food type. 

#for DDL

We finish with the following for **airbnb**
```
id                               int64 PRIMARY KEY
listing_url                     object
name                            object
description                     object CAN BE NULL
neighborhood_overview           object CAN BE NULL
picture_url                     object
host_id                          int64 FOREIGN KEY to Host
latitude                       float64
longitude                      float64
property_type                   object
room_type                       object ENUM
  {'Entire home/apt', 'Hotel room', 'Private room', 'Shared room'} 
accommodates                     int64
bathrooms_details               object
bedrooms                         int64
beds                             int64
amenities                       object
price                          float64
minimum_nights                   int64
maximum_nights                   int64
number_of_reviews                int64
review_scores_rating           float64
review_scores_cleanliness      float64
review_scores_checkin          float64
review_scores_communication    float64
review_scores_location         float64
instant_bookable                  bool
bathrooms                      float64
```
We finish with the following for **host**


```
host_id                       int64 PRIMARY KEY
host_url                     object
host_name                    object
host_since                   object
host_location                object
host_about                   object CAN BE NULL
host_response_time           object ENUM
  {'a few days or more', 'unknown', 'within a day', 'within a few hours', 'within an hour'}
host_response_rate            int64
host_acceptance_rate          int64
host_is_superhost              bool
host_neighbourhood           object
host_total_listings_count     int64

```
