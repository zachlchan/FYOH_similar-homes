const express = require('express');
const path = require('path');
const controller = require('../controller/listing.js');

const app = express();
const port = 8030;
const dist = path.join(__dirname, '../client/dist');

app.use(express.json());
app.use('/carousel/:id', express.static(dist));

// get all similar listings when given a specific id
// app.get('*/:id/listing', listingRouter.getOne);
app.get('/similar-homes', controller.getSimilar);
// add a similar listing to a listing id
app.post('/similar-homes', controller.addSimilar);

app.listen(8030, () => {
  console.log(`listening on http://localhost:${port}`);
});
