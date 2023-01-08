const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

const importData = async () => {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://kien-letritrung:P6tawX8wmznE@cluster0.imagvje.mongodb.net/snack-ordering?retryWrites=true&w=majority'
  );

  const hashedPassword = await bcrypt.hash('P7tawX8wmznE', 12);

  console.log('Here!');

  try {
    await client
      .db('snack-ordering')
      .collection('users')
      .insertMany([
        {
          name: 'Le Tri Trung Kien',
          username: 'kienltt',
          password: hashedPassword,
        },
      ]);
    console.log('Inserted!');
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const deleteData = async () => {
  return;
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
