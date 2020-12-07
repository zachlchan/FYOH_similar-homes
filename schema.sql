DROP SCHEMA IF EXISTS trelia CASCADE;

CREATE SCHEMA trelia
  CREATE TABLE trelia.listings (
    listing_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    price integer,
    size_bd smallint CONSTRAINT valid_bd_count CHECK (size_bd > 0 AND size_bd < 100),
    size_ba smallint CONSTRAINT valid_ba_count CHECK (size_ba > 0 AND size_ba < 100),
    size_sqft smallint CONSTRAINT valid_sqft_count CHECK (size_sqft > 1199 AND size_sqft < 4001),
    street_address varchar(100),
    neighborhood varchar(50),
    listing_image varchar(100),
    favorite boolean
  );
  CREATE TABLE trelia.similar_homes (
    listing_id  integer references trelia.listings(listing_id) ON DELETE CASCADE,
    similar_id integer references trelia.listings(listing_id) ON DELETE CASCADE,
    similarity_weight decimal(4,2)
  );
  CREATE TABLE trelia.users (
    user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name varchar(30)
  );
  CREATE TABLE trelia.user_favorites (
    user_id integer references trelia.users(user_id) ON DELETE CASCADE,
    favorite_id integer references trelia.listings(listing_id) ON DELETE CASCADE
  );