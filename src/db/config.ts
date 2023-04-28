import { Sequelize, DataTypes } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// const sequelize =
//   process.env.NODE_ENV === "test"
//       ? new Sequelize(
//           "postgres://phantom:x7HCMMAY9JKsniBAALdPND1TqqiqJCAD@dpg-ch5o2pl269v5rfrv4h0g-a.oregon-postgres.render.com/phantom_n3ha",
//           {
//               logging: false,
//               sync: {
//                   force: false,
//                   alter: { drop: false },
//               },
//           }
//       )
//       : new Sequelize({
//           dialect: "postgres",
//           host: String(process.env.DB_HOST),
//           port: Number(process.env.DB_PORT),
//           database: String(process.env.DB_NAME),
//           username: String(process.env.DB_USER),
//           password: String(process.env.DB_PASSWORD),
//           logging: false,
//           sync: {
//               force: false,
//               alter: { drop: false },
//           },
//       })

const sequelize = new Sequelize(
    "postgres://phantom:x7HCMMAY9JKsniBAALdPND1TqqiqJCAD@dpg-ch5o2pl269v5rfrv4h0g-a.oregon-postgres.render.com/phantom_n3ha",
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
