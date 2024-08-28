async getDataFromDatabase(req, res) {
    try {
      const results = await db.query("SELECT * FROM data_user");
      res.setHeader("Content-Type", "application/json");

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