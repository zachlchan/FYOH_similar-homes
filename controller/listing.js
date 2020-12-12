const database = require('../db_psql/connection.js');

// options to toggle between client and pool
// const db = database.client;
const db = database.pool;
// Get request for all the similar homes associated with a listing
exports.getSimilar = (req, res) => {
  const { listing_id } = req.params;
  // console.log('GET, similar for listing_id', listing_id);

  db.query(
    `SELECT
      trelia.listings.*,
      similarity_weight
    FROM
      trelia.listings
    LEFT JOIN
      trelia.similar_homes
    ON
      trelia.listings.listing_id = trelia.similar_homes.similar_id
    WHERE
      trelia.similar_homes.listing_id = $1;`, [listing_id], (err, similarListings) => {
    if (err) {
      return handleError(err);
    } else {
      res.send(similarListings.rows);
    }
  });
}

exports.addSimilar = (req, res) => {
  const { listing_id, similar_id, similarity_weight } = req.body;
  // console.log('POST, request body', req.body);

  db.query(
    `INSERT INTO
      trelia.similar_homes (listing_id, similar_id, similarity_weight)
    VALUES ($1, $2, $3);`, [listing_id, similar_id, similarity_weight], (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(201);
    }
  });
}

exports.updateSimilar = (req, res) => {
  const { listing_id, similar_id, similarity_weight } = req.body;
  // console.log('PUT, request body', req.body);

  db.query(
    `UPDATE
      trelia.similar_homes
    SET
      similarity_weight = $1
    WHERE
      listing_id = $2
    AND
      similar_id = $3;`, [similarity_weight, listing_id, similar_id], (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(200);
    }
  });
}

exports.deleteSimilar = (req, res) => {
  const { listing_id, similar_id } = req.body;
  // console.log('DELETE, request body', req.body);

  db.query(
    `DELETE FROM
      trelia.similar_homes
    WHERE
      listing_id = $1
    AND similar_id = $2;`, [listing_id, similar_id], (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(200)
    }
  });
}

