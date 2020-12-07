const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

// number of primary listings = 10M
let numListings = 100;

// number of similar homes = 15 per listing
let numSimilarHomes = 15 * numListings;

// users = 1M
let numUsers = 100;

// helper function to generate random numbers
const getRandomIntInclusive = (min, max, skew = 1) => {
  return Math.floor((Math.random() ** skew) * (max - min + 1) + min);
}

// helper function to generate a unique related ID
const generateRelatedID = (highestID, collection) => {
  let generated_id = getRandomIntInclusive(1, highestID);
  if (!collection[generated_id]) {
    return generated_id;
  } else {
    generated_id = getRandomIntInclusive(1, highestID);
    return generated_id;
  }
}

// generate data for listings table
const writeListingData = fs.createWriteStream('./data_generator/csv/psql_listing_data.csv');
writeListingData.write('price,size_bd,size_ba,size_sqft,street_address,neighborhood,listing_image,favorite\n');

const writeListings = (writer, callback) => {
  let i = numListings;

  const write = () => {
    let ok = true;
    do {
      i -= 1;

      const price = getRandomIntInclusive(20, 800, 2) * 10000;
      const size_bd = getRandomIntInclusive(1, 6, 0.5);
      const size_ba = getRandomIntInclusive(1, 6);
      const size_sqft = getRandomIntInclusive(12,40, 2) * 100;
      const street_address = faker.address.streetAddress();
      const neighborhood = faker.fake("{{address.county}}, {{address.city}}, {{address.stateAbbr}}");
      const listing_image = 'placeholder.com';
      const favorite = false;

      const data = `${price},${size_bd},${size_ba},${size_sqft},${street_address},"${neighborhood}",${listing_image},${favorite}\n`;

      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
writeListings(writeListingData, () => {writeListingData.end();});


// generate data for similar_homes table
const writeSimilarHomeData = fs.createWriteStream('./data_generator/csv/psql_similar_home_data.csv');
writeSimilarHomeData.write('listing_id,similar_id,similarity_weight\n');

const writeSimilarHomes = (writer, callback) => {
  let i = numSimilarHomes;
  let id = 1;
  let id_counter = 0;
  let similar_ids = {};

  const write = () => {
    let ok = true;

    do {
      i -= 1;

      if (id_counter && (id_counter % 15 === 0)) {
        id += 1;
        similar_ids = {};
      }

      const listing_id = id;
      const similar_id = generateRelatedID(numListings, similar_ids);
      similar_ids[similar_id] = similar_id;
      const similarity_weight = (getRandomIntInclusive(100, 1000, 0.5) * 0.01).toFixed(2);

      const data = `${listing_id},${similar_id},${similarity_weight}\n`;
      id_counter +=1;

      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
writeSimilarHomes(writeSimilarHomeData, () => {writeSimilarHomeData.end();});


// generate data for users table
const writeUserData = fs.createWriteStream('./data_generator/csv/psql_user_data.csv');
writeUserData.write('user_name\n');

const writeUsers = (writer, callback) => {
  let i = numUsers;

  const write = () => {
    let ok = true;

    do {
      i -= 1;

      const user_name = faker.internet.userName();

      const data = `${user_name}\n`;

      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
writeUsers(writeUserData, () => {writeUserData.end();});


// generate data for user_favorites table
const writeUserFavoritesData = fs.createWriteStream('./data_generator/csv/psql_user_favorites_data.csv');
writeUserFavoritesData.write('user_id,favorite_id\n');

const writeUserFavorites = (writer, callback) => {
  let i = numUsers; // 100
  let id = 1;
  let numFavorites = getRandomIntInclusive(0,20); // favorites = up to 20 per user
  let favorites_counter = 0;
  let favorite_ids = {};

  const write = () => {
    let ok = true;

    do {

      if (favorites_counter === numFavorites) {
        i -=1 ;
        id += 1;
        numFavorites = getRandomIntInclusive(0,20);
        favorites_counter = 0;
        favorite_ids = {};
      } else {
        const user_id = id;
        const favorite_id = generateRelatedID(numListings, favorite_ids);

        const data = `${user_id},${favorite_id}\n`;

        if (i === 0) {
          writer.write(data, callback);
        } else {
          ok = writer.write(data);
        }

        favorites_counter += 1;
      }

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
writeUserFavorites(writeUserFavoritesData, () => {writeUserFavoritesData.end();});
