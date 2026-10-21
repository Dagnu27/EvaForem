require("dotenv").config();
const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

// quick connection check
dbConnection.execute("select 'test'", (err, result) => {
  if (err) console.log("DB connection failed:", err.message);
  else console.log("MySQL connected:", result);
});

module.exports = dbConnection.promise();