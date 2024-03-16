import app from "./app.mjs";
import dbConnection from "./db/dbConnection.mjs";
import "dotenv/config";

const port = process.env.PORT || 5000;

dbConnection()
  .then(() => {
    app.on("error", (err) => {
      console.log("err:", err);
      throw err;
    });

    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed: ", err);
  });
