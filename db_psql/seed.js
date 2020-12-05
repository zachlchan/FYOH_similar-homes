const path = require('path');
const db = require('./connection.js');

// ---- to create schema in the db, in terminal enter:
// ---- \i shema.sql

// file paths for csv's
const listing_data_path = path.join(__dirname, '../data_generator/csv/psql_listing_data.csv');
const similar_homes_data_path = path.join(__dirname, '../data_generator/csv/psql_similar_home_data.csv');
const user_data_path = path.join(__dirname, '../data_generator/csv/psql_user_data.csv');

// seed data into listings table from csv
db.client.query(
  `COPY trelia.listings(price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite) FROM '${listing_data_path}' DELIMITER ',' CSV HEADER`,
  (err, res) => {
    if (err) {
      console.log('error seeding psql', err);
    } else {
      console.log('listings data successfully seeded');
    }
  }
);

// seed data into similar_homes table from csv
db.client.query(
  `COPY trelia.similar_homes(listing_id, similar_id, similarity_weight) FROM '${similar_homes_data_path}' DELIMITER ',' CSV HEADER`,
  (err, res) => {
    if (err) {
      console.log('error seeding psql', err);
    } else {
      console.log('similar_homes data successfully seeded');
    }
  }
);

// seed data into users table from csv
db.client.query(
  `COPY trelia.users(user_name) FROM '${user_data_path}' CSV HEADER`,
  (err, res) => {
    if (err) {
      console.log('error seeding psql', err);
    } else {
      console.log('user data successfully seeded');
    }
  }
);