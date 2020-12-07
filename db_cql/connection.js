const cassandra = require('cassandra-driver');

const config = {
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'trelia',
}

const client = new cassandra.Client(config);
client
  .connect()
  .then(() => console.log('connected to cassandra'))
  .catch((e) => console.log(e));

module.exports.client = client;
