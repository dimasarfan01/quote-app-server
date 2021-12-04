const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  urlDb: process.env.MONGO_URL,
  jwtKey: process.env.SECRET,
};
