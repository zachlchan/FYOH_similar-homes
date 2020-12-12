require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const controller = require('../controller/listing.js');

const app = express();
const port = 8030;
const dist = path.join(__dirname, '../client/dist');

// app.use(morgan('dev'));
app.use(express.json());
app.use('/listings/:listing_id', express.static(dist));

// legacy route --> app.get('*/:id/listing', listingRouter.getOne);

// get all similar listings when given a specific id
app.get('/listings/:listing_id/similar-homes', controller.getSimilar);
// add a similar listing to a listing id
app.post('*/similar-homes', controller.addSimilar);
// update a similar listing's similarity weight
app.put('*/similar-homes', controller.updateSimilar);
// delete a similar home related to a listing id
app.delete('*/similar-homes', controller.deleteSimilar);

app.listen(8030, () => {
  console.log(`listening on http://localhost:${port}`);
});
