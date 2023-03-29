import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize({
    dialect: "postgres",
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    sync: {
        force: false,
        alter: {drop: false}
    }
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

