require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "172.18.0.2",
    port: process.env.DB_PORT,
    dialect: "mysql",
    migrationStorageTableName: "migrations",
  },
};
