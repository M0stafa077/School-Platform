require("dotenv").config();

export const development = {
  username: process.env.MYSQL_MY_USER,
  password: process.env.MYSQL_MY_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};
