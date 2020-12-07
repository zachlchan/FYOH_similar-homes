-- in trelia keyspace (use trelia)

-- remove existing data from table without dropping
TRUNCATE trelia.home_listings_by_id;

-- insert home listings data minus similar_homes data
COPY trelia.home_listings_by_id(listing_id, price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite, similar_homes) FROM '/Users/zach/Hack Reactor/HRSF131/SDC/image-carousel/data_generator/csv/cql_home_listings_data.csv' with HEADER=TRUE AND DELIMITER = '|';
