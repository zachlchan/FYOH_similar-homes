
CREATE SCHEMA trelia
  CREATE TABLE listings (
    listing_id serial PRIMARY KEY,
    price varchar(14),
    size_bd smallint CONSTRAINT valid_bd_count CHECK (size_bd > 0 AND size_bd < 100),
    size_ba smallint CONSTRAINT valid_ba_count CHECK (size_ba > 0 AND size_ba < 100),
    street_address varchar(50),
    neighborhood varchar(50),
    listing_image varchar(100),
    favorite boolean
  );
  CREATE TABLE similar_homes (
    listing_id serial references trelia.listings(listing_id),
    similar_id serial references trelia.listings(listing_id),
    similarity_weight decimal(3,1)
  );
  CREATE TABLE users (
    user_id serial PRIMARY KEY,
    user_name varchar(30)
  )
  CREATE TABLE user_favorites (
    user_id serial references trelia.users(user_id),
    favorite_id serial references trelia.listings(listing_id)
  )