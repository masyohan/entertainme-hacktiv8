const { MongoClient } = require('mongodb');
const dbURL = process.env.DATABASE_URL;
const client = new MongoClient(dbURL, { useUnifiedTopology: true });
const dbName = process.env.DATABASE_NAME;

client.connect();

const db = client.db(dbName);

module.exports = db