import "reflect-metadata";
import { DataSource } from "typeorm";

// entity imports
import Entities from "../entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  logging: false,
  entities: [...Object.values(Entities)],
  ssl: true,
});

let isInitialized = false;

const connectDB = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log("Database connected successfully");
    } catch (error: any) {
      console.error(`Error in database connection: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log("Using existing database connection");
  }
  return AppDataSource;
};

export default connectDB;
