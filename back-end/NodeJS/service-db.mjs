import * as mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_dataservice",
});

connection.connect(function (err) {
  if (err) {
    console.log("Connection Failed");
    throw err;
  } else {
    console.log("Database connected  succesfully");
  }
});

connection.query(
  "CREATE DATABASE IF NOT EXISTS NodeJS_DataService",
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Database created");
    }
  }
);

connection.query(
  `CREATE TABLE IF NOT EXISTS data_user(
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255),
  user_age INTEGER,
  user_email VARCHAR(255),
  user_address VARCHAR(255),
  user_phone VARCHAR(255),
  PRIMARY KEY (user_id))`,
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Table created");
    }
  }
);
