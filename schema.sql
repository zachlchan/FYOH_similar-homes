
CREATE SCHEMA trelia
  CREATE TABLE listings (
    listing_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    price varchar(14),
    size_bd smallint CONSTRAINT valid_bd_count CHECK (size_bd > 0 AND size_bd < 100),
    size_ba smallint CONSTRAINT valid_ba_count CHECK (size_ba > 0 AND size_ba < 100),
    address varchar(50),
    neighborhood varchar(50),
    image varchar(100),
    favorite boolean
  );
  CREATE TABLE similar_homes (
    listing_id uuid references trelia.listings(listing_id),
    similar_id uuid references trelia.listings(listing_id),
    similarity_weight decimal
  );
  CREATE TABLE users (
    user_id uuid PRIMARY KEY
  )
  CREATE TABLE user_favorites (
    user_id uuid references trelia.users(user_id),
    list_name varchar(50),
    favorite_id uuid references trelia.listings(listing_id)
  )