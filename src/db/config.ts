import { Sequelize, DataTypes } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize =
  process.env.NODE_ENV === "test"
      ? new Sequelize(
          "postgresql://postgres:reaYBl4M1hbiDdxjnTdr@containers-us-west-194.railway.app:7407/railway",
          {
              logging: false,
              sync: {
                  force: false,
                  alter: { drop: false },
              },
          }
      )
      : new Sequelize({
          dialect: "postgres",
          host: String(process.env.DB_HOST),
          port: Number(process.env.DB_PORT),
          database: String(process.env.DB_NAME),
          username: String(process.env.DB_USER),
          password: String(process.env.DB_PASSWORD),
          logging: false,
          sync: {
              force: false,
              alter: { drop: false },
          },
      })

async function connectDB() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Successfully connected and synced the database")
    } catch (error) {
        console.error("Database connection error:", error)
    }
}

export { connectDB, sequelize, Sequelize, DataTypes }
