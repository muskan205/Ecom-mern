import express from "express"; // Correct syntax for express
const { AppDataSource } = require("../src/infra/db/data-source");
import userRoutes from "./modules/user/routes/AuthRoutes";
import adminRoutes from './modules/admin/routes/admin.routes'
import sellerRoutes from './modules/seller/routes/sellerRoutes'
import cors from 'cors'
import "reflect-metadata"; // Required for TypeORM decorators to work
const app = express();
const port = 3004;
const dotenv =require("dotenv")

dotenv.config()

app.use(express.json());
app.use(cors())
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Use the userRoutes for handling /users routes
    app.use("/api", userRoutes);
    app.use('/seller',adminRoutes)
    app.use('/shop',sellerRoutes)
    

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log("************",process.env.Secret_Key)
    });
  })
  .catch((error: any) => {
    console.error("Error during Data Source initialization:", error);
  });
