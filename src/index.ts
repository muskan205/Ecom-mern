import express from "express"; // Correct syntax for express
const { AppDataSource } = require("./data-source");
import userRoutes from "../routes/userRoutes";
import "reflect-metadata"; // Required for TypeORM decorators to work
const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Use the userRoutes for handling /users routes
    app.use("/api", userRoutes);

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Error during Data Source initialization:", error);
  });
