const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sanyals300:4mSQfKHAQOMYz25g@oneheart.kpat11d.mongodb.net/';
const client = new MongoClient(url);

const dbName = 'HelloGts';

async function main() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  const data = {
  "firstName": "Bishwanath",
  "lastName": "Hansdah",
  "city/town": "Ghatsila",
  "phoneNumber": "6206053176"
  }; 

const findResult = await collection.find({"lastName": "Hansdah"}).toArray();
console.log('Found documents =>', findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
