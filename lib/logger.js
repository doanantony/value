const winston = require("winston");
require("winston-mongodb");

const logger = winston.add(winston.transports.MongoDB, {
  // TODO: Have to make this work from dot env
  db: `mongodb://localhost:27017/valuecart`,
  collection: `weblogs`,
  capped: true
});

module.exports.Logger = logger;
