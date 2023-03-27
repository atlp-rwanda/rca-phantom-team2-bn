import { Sequelize, DataTypes } from "sequelize"
import dotenv from "dotenv"

dotenv.config()


const sequelize = new Sequelize(
    "postgresql://postgres:Q5pusAHnukzzbQvJLqxi@containers-us-west-194.railway.app:7407/railway"
)

async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log("Successfully connected to DB")
    } catch (error) {
        console.error("Database connection error:", error)
    }
}

export { connectDB, sequelize, Sequelize, DataTypes }
