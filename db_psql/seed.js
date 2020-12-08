const path = require('path');
const db = require('./connection.js');

// ---- to create schema in the db, in terminal enter:
// ---- \i db_psql/schema.sql

// file paths for csv's
const listing_data_path = path.join(__dirname, '../data_generator/csv/psql_listing_data.csv');
const similar_homes_data_path = path.join(__dirname, '../data_generator/csv/psql_similar_home_data.csv');
const user_data_path = path.join(__dirname, '../data_generator/csv/psql_user_data.csv');
const user_favorites_data_path = path.join(__dirname, '../data_generator/csv/psql_user_favorites_data.csv');

// helper function for seeding data into tables
const seed_table = (queryString, cb) => {
  db.client.query(queryString,
    (err, res) => {
      if (err) {
        console.log('error seeding psql', err);
      } else {
        cb;
      }
    }
  );
}

// query strings for seeding csv data into tables
const listings_queryString = `COPY trelia.listings(price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite) FROM '${listing_data_path}' DELIMITER ',' CSV HEADER`;

const similar_homes_queryString = `COPY trelia.similar_homes(listing_id, similar_id, similarity_weight) FROM '${similar_homes_data_path}' DELIMITER ',' CSV HEADER`;

const users_queryString = `COPY trelia.users(user_name) FROM '${user_data_path}' CSV HEADER`;

const user_favorites_queryString = `COPY trelia.user_favorites(user_id, favorite_id) FROM '${user_favorites_data_path}' DELIMITER ',' CSV HEADER`;

// seed the tables
console.time('listings data seeded');
seed_table(listings_queryString, console.timeEnd('listings data seeded'));
console.time('similar_homes data seeded');
seed_table(similar_homes_queryString, console.timeEnd('similar_homes data seeded'));
console.time('user data seeded');
seed_table(users_queryString, console.timeEnd('user data seeded'));
console.time('user_favorites data seeded');
seed_table(user_favorites_queryString, console.timeEnd('user_favorites data seeded'));
