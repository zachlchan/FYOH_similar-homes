DROP SCHEMA IF EXISTS trelia CASCADE;

CREATE SCHEMA trelia
  CREATE TABLE trelia.listings (
    listing_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    price integer,
    size_bd smallint,
    size_ba smallint,
    size_sqft smallint,
    street_address text,
    neighborhood text,
    listing_image text,
    favorite boolean
  );
  CREATE TABLE trelia.similar_homes (
    listing_id  integer,
    similar_id integer,
    similarity_weight numeric(4,2)
  );
  CREATE TABLE trelia.users (
    user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name text
  );
  CREATE TABLE trelia.user_favorites (
    user_id integer,
    favorite_id integer
  );