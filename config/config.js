require('dotenv').config();
const { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT,
  TEST_DB_HOST, TEST_DB_NAME, TEST_DB_PASS, TEST_DB_USER } = process.env;

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
        username: TEST_DB_USER,
        password: TEST_DB_PASS,
        database: TEST_DB_NAME,
        host: TEST_DB_HOST,
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
  