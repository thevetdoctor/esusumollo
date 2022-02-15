require('dotenv').config();
const { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT } = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
      dialect: "postgres",
      logging: false
    },
    test: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",
        logging: false
    },
    "production": {
        username: DB_USER, 
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",
        logging: false
    }
  }
  