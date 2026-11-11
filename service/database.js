const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');
const highscoreCollection = db.collection('highscore');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  if (!token) return null;
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function getScores() {
  return scoreCollection
    .find({}, { sort: { score: -1 }, limit: 10 })
    .toArray();
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

async function getHighScore(email) {
  const result = await highscoreCollection.findOne({ email: email });
  return result ? result.score : 0;
}

async function setHighScore(email, score) {
  const current = await getHighScore(email);
  if (score > current) {
    await highscoreCollection.updateOne(
      { email: email },
      { $set: { email: email, score: score } },
      { upsert: true }
    );
  }
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getScores,
  addScore,
  getHighScore,
  setHighScore,
};