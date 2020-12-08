-- in trelia keyspace: source 'db_cql/seed.cql'

SOURCE 'db_cql/schema.cql';

-- remove existing data from tables without dropping
TRUNCATE trelia.home_listings;
TRUNCATE trelia.favorite_listings;

-- insert home_listings data
COPY trelia.home_listings(listing_id, price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite, similar_homes) FROM '/Users/zach/Hack Reactor/HRSF131/SDC/image-carousel/data_generator/csv/cql_home_listings_data.csv' with HEADER=TRUE AND DELIMITER = '|';

-- insert favorite_listings data
COPY trelia.favorite_listings(user_id, user_name, favorite_homes) FROM '/Users/zach/Hack Reactor/HRSF131/SDC/image-carousel/data_generator/csv/cql_favorite_listings_data.csv' with HEADER=TRUE AND DELIMITER = '|';
