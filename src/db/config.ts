import { Sequelize, DataTypes } from "sequelize"
import dotenv from "dotenv"

// const sequelize = new Sequelize({
//     dialect: "postgres",
//     host: String(process.env.DB_HOST),
//     port: Number(process.env.DB_PORT),
//     database: String(process.env.DB_NAME),
//     username: String(process.env.DB_USER),
//     password: String(process.env.DB_PASSWORD),
// })

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