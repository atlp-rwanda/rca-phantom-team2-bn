require('dotenv').config()
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
})

async function connectDB() {
    try {
        await sequelize.authenticate()
        console.log('Successfully connected to DB')
    } catch (error) {
        console.error('Database connection error:', error)
    }
}

export { connectDB, sequelize, Sequelize, DataTypes }
