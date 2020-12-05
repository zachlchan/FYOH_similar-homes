const { Client } = require('pg');

const config = {
  database: 'sdc',
  port: 5432,
}

const client = new Client(config);
client
  .connect()
  .then(() => console.log('connected to PSQL'))
  .catch((e) => console.log(e));

module.exports.client = client;