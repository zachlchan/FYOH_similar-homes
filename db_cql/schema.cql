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

DROP KEYSPACE IF EXISTS trelia;

CREATE KEYSPACE trelia WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE trelia.similar_listings
(
  listing_id int,
  price varchar,
  size_bd tinyint,
  size_ba tinyint,
  size_sqft smallint,
  street_address varchar,
  neighborhood varchar,
  listing_image varchar,
  favorite boolean,
  similar_to_id int,
  similarity_weight decimal,
  PRIMARY KEY (similar_to_id, similarity_weight),
)
  WITH clustering order by (similarity_weight DESC);

CREATE TABLE trelia.favorite_listings
(
  user_id int PRIMARY KEY,
  user_name varchar,
  favorite_homes set<int>,
)
  WITH comment = 'Q3. Find favorite listings by user_ID';
