const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');
const highscoreCollection = db.collection('highscore')

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return users.find((u) => u.email === email);
}

async function getUserByToken(token) {
  if (!token) return null;
  return users.find((u) => u.token === token);
}

async function addUser(user) {
  users.push(user);
}

async function updateUser(user) {
  // In memory the user object is already changed, so nothing to do.
  // With MongoDB, this is where you will save the changes.
}

async function getScores() {
  return scores;
}

async function addScore(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }
  if (!found) {
    scores.push(newScore);
  }
  if (scores.length > 10) {
    scores.length = 10;
  }
  return scores;
}

async function getHighScore(email) {
  return highScores[email] || 0;
}

async function setHighScore(email, score) {
  if (score > (highScores[email] || 0)) {
    highScores[email] = score;
  }
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getScores,
  addScore,
  getHighScore,
  setHighScore,
};