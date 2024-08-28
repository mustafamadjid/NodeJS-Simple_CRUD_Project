import { connection as db } from "./service-db.mjs";

export class DataService {
  async getDataFromDatabase(req, res) {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM data_user", (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
      });

      if (results) {
        res.write(
          JSON.stringify({
            code: 200,
            message: "Data fetched successfully",
            data: results,
          })
        );
      } else {
        res.write(
          JSON.stringify({
            code: 404,
            message: "No data found",
          })
        );
      }

      res.end();
    } catch (error) {
      res.write(
        JSON.stringify({
          code: 500,
          message: "Internal Server Error",
        })
      );
      res.end();
    }
  }

  async createDataToDatabase(req, res) {
    try {
      let body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error("Invalid JSON"));
          }
        });
        req.on("error", reject);
      });

      if (
        !(
          body.user_name &&
          body.user_age &&
          body.user_email &&
          body.user_address &&
          body.user_phone
        )
      ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            code: 400,
            message: "Bad Request : Missing required fields",
          })
        );
      } else {
        await new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO data_user (user_name, user_age, user_email, user_address, user_phone)
         VALUES (?, ?, ?, ?, ?)`,
            [
              body.user_name,
              body.user_age,
              body.user_email,
              body.user_address,
              body.user_phone,
            ],
            (error, results) => {
              if (error) return reject(error);
              resolve(results);
            }
          );
        });
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            code: 201,
            message: "Data created successfully",
          })
        );
      }

      res.end();
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          code: 500,
          message: "Internal Server Error",
        })
      );
      res.end();
    }
  }

  async updateDataInDatabase(req, res) {
    try {
      let body = ``;

      await new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            body = JSON.parse(body);
            resolve();
          } catch (err) {
            reject(err);
          }
        });

        req.on("error", (err) => {
          reject(err);
        });
      });

      if (
        !(
          body.user_name &&
          body.user_age &&
          body.user_email &&
          body.user_address &&
          body.user_phone &&
          body.user_id
        )
      ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            code: 400,
            message: "Bad Request : Missing required fields",
          })
        );
        return;
      }
      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE data_user SET user_name=?, user_age=?, user_email=?, user_address=?, user_phone=? WHERE user_id=?`,
          [
            body.user_name,
            body.user_age,
            body.user_email,
            body.user_address,
            body.user_phone,
            body.user_id,
          ],
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
            res.write(
              JSON.stringify({
                code: 200,
                message: "Data updated successfully",
              })
            );
            res.end();
          }
        );
      });
    } catch (error) {
      res.write(
        JSON.stringify({
          code: 500,
          message: "Internal Server Error",
        })
      );
      res.end();
    }
  }

  async deleteDataFromDatabase(req, res) {
    try {
      let body = ``;

      await new Promise((resolve, reject) => {
        try {
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", () => {
            body = JSON.parse(body);
            resolve();
          });

          req.on("error", (err) => {
            reject(err);
          });
        } catch (error) {
          reject(error);
        }
      });

      if (!body.user_id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            code: 400,
            message: "Bad Request : Missing required field 'user_id' ",
          })
        );
        return;
      }

      await new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM data_user WHERE user_id=?`,
          [body.user_id],
          (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
            res.write(
              JSON.stringify({
                code: 200,
                message: "Data deleted successfully",
              })
            );
            res.end();
          }
        );
      });
    } catch (error) {
      res.write(
        JSON.stringify({
          code: 500,
          message: "Internal Server Error",
        })
      );
      res.end();
    }
  }
}

// results
//   .then((data) => {
//     if (data) {
//       return JSON.stringify({
//         code: 200,
//         message: "Data fetched successfully",
//         data: data,
//       });
//     } else {
//       return JSON.stringify({
//         code: 404,
//         message: "No data found",
//       });
//     }
//   })
//   .then((data) => {
//     res.write(data);
//     res.end();
//   });
