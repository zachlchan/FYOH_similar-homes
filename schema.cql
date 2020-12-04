
CREATE KEYSPACE trelia WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TYPE listingDetail AS
(
  listing_id int,
  price varchar,
  size_bd tinyint,
  size_ba tinyint,
  address varchar,
  neighborhood varchar
);

CREATE TABLE trelia.similar_homes_by_listing_id_and_weight
(
  listing_id int,
  price varchar,
  size_bd tinyint,
  size_ba tinyint,
  address varchar,
  neighborhood varchar,
  image varchar,
  similar_id int,
  weight decimal,
  PRIMARY KEY (listing_id, weight)
)
  WITH comment = 'Q1. Find similar homes by listing ID and weight';

CREATE TABLE trelia.favorite_listings_by_user_id
(
  -- listing listingDetail
  user_id int,
  favorite_id int,
  PRIMARY KEY (user_id)
)
  WITH comment = 'Q2. Find favorite listings by user ID';
