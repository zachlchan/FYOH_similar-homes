const db = require('../db_psql/connection.js');

// Get request for all the similar homes associated with a listing
exports.getSimilar = (req, res) => {
  const { listing_id } = req.params;
  console.log('GET, similar for listing_id', listing_id);

  db.client.query(`SELECT trelia.listings.listing_id, price, size_bd, size_ba, size_sqft, street_address, neighborhood, listing_image, favorite, similarity_weight FROM trelia.listings LEFT JOIN trelia.similar_homes ON trelia.listings.listing_id = trelia.similar_homes.similar_id WHERE trelia.similar_homes.listing_id = ${listing_id};`, (err, similarListings) => {
    if (err) {
      return handleError(err);
    } else {
      res.send(similarListings.rows);
    }
  });
}

exports.addSimilar = (req, res) => {
  const { listing_id, similar_id, similarity_weight } = req.body;
  console.log('POST, request body', req.body);

  db.client.query(`INSERT INTO trelia.similar_homes(listing_id, similar_id, similarity_weight) VALUES (${listing_id}, ${similar_id}, ${similarity_weight});`, (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(201);
    }
  });
}

exports.updateSimilar = (req, res) => {
  const { listing_id, similar_id, similarity_weight } = req.body;
  console.log('PUT, request body', req.body);

  db.client.query(`UPDATE trelia.similar_homes SET similarity_weight = ${similarity_weight} where listing_id = ${listing_id} and similar_id = ${similar_id};`, (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(200);
    }
  })
}

exports.deleteSimilar = (req, res) => {
  const { listing_id, similar_id } = req.body;
  console.log('DELETE, request body', req.body);

  db.client.query(`DELETE FROM trelia.similar_homes where listing_id = ${listing_id} and similar_id = ${similar_id};`, (err) => {
    if (err) {
      return handleError(err);
    } else {
      res.sendStatus(200)
    }
  })
}

