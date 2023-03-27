import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = String(process.env.DATABASE_URL);

const sequelize = new Sequelize(dbUrl);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };