import { Sequelize, DataTypes } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
    "postgresql://postgres:reaYBl4M1hbiDdxjnTdr@containers-us-west-194.railway.app:7407/railway",
    {
        logging: false,
        sync: {
            force: false,
            alter: { drop: false },
        },
    }
)

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
