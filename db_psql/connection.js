const { Client, Pool } = require('pg');

const client_config = {
  database: 'sdc',
  port: 5432,
}

const pool_config = {
  database: 'sdc',
  max: 10,
  port: 5432,
}

const client = new Client(client_config);
client
  .connect()
  .then(() => console.log('connected to PSQL'))
  .catch((e) => console.log(e));

const pool = new Pool(pool_config);
pool
  .connect()
  .then(() => console.log('connected to PSQL'))
  .catch((e) => console.log(e));

module.exports.client = client;
module.exports.pool = client;
