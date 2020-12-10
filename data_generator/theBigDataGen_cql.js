const fs = require('fs');
const faker = require('faker');

// number of primary listings = 10M
let numListings = 10000000;

// users = 1M
let numUsers = 1000000;

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

// helper function to create map of similar homes
const generateSimilarHomes = () => {
  let similarHomes = {}
  let similarHomesMap= [];
  for (let i = 0; i < numSimilarHomes; i++) {
    const similar_id = generateRelatedID(numListings, similarHomes);
    const similarity_weight = (getRandomIntInclusive(1, 100, 0.5) * 0.1).toFixed(1);
    similarHomes[similar_id] = similarity_weight;
    similarHomesMap.push(`${similar_id}:${similarity_weight}`);
  }
  return similarHomesMap.toString();
}

// helper function to create set of favorite listings
const generateFavoriteListings = () => {
  let numFavorites = getRandomIntInclusive(0,20); // favorites = up to 20 per user
  let favoriteListings = [];
  favoriteIDs = {};
  for (let i = 0; i < numFavorites; i++) {
    const favorite_id = generateRelatedID(numListings, favoriteIDs);
    favoriteIDs[favorite_id] = favorite_id;
    favoriteListings.push(favorite_id);
  }

  return favoriteListings;
}

// generate data for home_listings_by_id table
const writeHomeListingData = fs.createWriteStream('./data_generator/csv/cql_home_listings_data.csv');
writeHomeListingData.write('listing_id|price|size_bd|size_ba|size_sqft|street_address|neighborhood|listing_image|favorite|similar_to_id|similarity_weight\n');

const writeHomeListings = (writer, callback) => {
  let i = 1
  let totalListings = numListings * 15; // 15 similar per listing
  let similar_id = numListings;
  let similar_counter = 0;

  const write = () => {
    let ok = true;
    do {
      // track progress fo every 1M rows
      if (i % 1000000 === 0) {
        console.log(`${i} rows generated`);
      }

      // increment id every 15 listings
      if (similar_counter === 15) {
        similar_id -= 1;
        similar_counter = 0;
      } else {
        const listing_id = i;
        const price = getRandomIntInclusive(20, 800, 2) * 10000;
        const size_bd = getRandomIntInclusive(1, 6, 0.5);
        const size_ba = getRandomIntInclusive(1, 6);
        const size_sqft = getRandomIntInclusive(12,40, 2) * 100;
        const street_address = faker.address.streetAddress();
        const neighborhood = faker.fake("{{address.county}}, {{address.city}}, {{address.stateAbbr}}");
        const img_num = i % 1000;
        const listing_image = `https://sdc-trelia.s3-us-west-1.amazonaws.com/${img_num}.jpg`;
        const favorite = false;
        const similar_to_id = similar_id;
        const similarity_weight = (getRandomIntInclusive(100, 1000, 0.5) * 0.01).toFixed(2);

        const data = `${listing_id}|${price}|${size_bd}|${size_ba}|${size_sqft}|${street_address}|${neighborhood}|${listing_image}|${favorite}|${similar_to_id}|${similarity_weight}\n`;

        if (i === totalListings) {
          writer.write(data, callback);
        } else {
          ok = writer.write(data);
        }
        i += 1;
        similar_counter += 1;
      }
    } while (i <= totalListings && ok); // 15 similar homes per listing

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
console.time('generated home_listings data');
writeHomeListings(writeHomeListingData, () => {
  writeHomeListingData.end();
  console.timeEnd('generated home_listings data');
});


// generate data for favorite_listings table
const writeFavoriteListingsData = fs.createWriteStream('./data_generator/csv/cql_favorite_listings_data.csv');
writeFavoriteListingsData.write('user_id|user_name|favorite_homes\n');

const writeFavoriteListings = (writer, callback) => {
  let i = numUsers;
  let id = 1;

  const write = () => {
    let ok = true;

    do {
      i -= 1;

      const user_id = id;
      const user_name = faker.internet.userName();
      const favorite_listings = generateFavoriteListings();
      const favorite_homes = `[${favorite_listings}]`;

      const data = `${user_id}|${user_name}|${favorite_homes}\n`;

      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }

      id += 1;
    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }

  write();
}
console.time('generated favorite_listings data');
writeFavoriteListings(writeFavoriteListingsData, () => {
  writeFavoriteListingsData.end();
  console.timeEnd('generated favorite_listings data');
});
