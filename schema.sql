
CREATE SCHEMA trulia
  CREATE TABLE listings (
    id integer PRIMARY KEY,
    price varchar(14),
    size_bd integer,
    size_ba integer,
    address varchar(50),
    neighborhood varchar(50),
    image varchar(100)
  );
  CREATE TABLE similar_homes (
    listing_id integer references trulia.listings(id),
    similar_id integer references trulia.listings(id),
    similarity_weight integer
  );