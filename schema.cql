
CREATE KEYSPACE trelia WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor': 3};

-- CREATE TYPE listingDetail AS
-- (
--   price int,
--   size_bd tinyint,
--   size_ba tinyint,
--   size_sqft smallint,
--   street_address varchar,
--   neighborhood varchar,
--   listing_image varchar,
--   favorite boolean,
-- );

CREATE TABLE trelia.home_listing_by_id
(
  listing_id int PRIMARY KEY,
  price varchar,
  size_bd tinyint,
  size_ba tinyint,
  size_sqft smallint,
  street_address varchar,
  neighborhood varchar,
  listing_image varchar,
  favorite boolean,
  similar_homes map<int, decimal>,
)
  WITH comment = 'Q1. Find homelistings by ID';

CREATE TABLE trelia.favorite_listings_by_user_id
(
  listing listingDetail
  user_id int PRIMARY KEY,
  user_name varchar,
  favorite_homes set<int>,
)
  WITH comment = 'Q3. Find favorite listings by user ID';
