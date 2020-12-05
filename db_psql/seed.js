const path = require('path');
const db = require('./connection.js');

// to load schema, in terminal enter:
// \i shema.sql

const listing_data_path = path.join(__dirname, '../data_generator/csv/psql_listing_data.csv');
console.log('seed path', listing_data_path);

db.client.query(
  `COPY trelia.listings(price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite) FROM '${listing_data_path}' DELIMITER ',' CSV HEADER`,
  (err, res) => {
    if (err) {
      console.log('postgres seed error', err);
    } else {
      console.log('listings success');
    }
  },
);