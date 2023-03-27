import { config } from "dotenv"

switch (process.env.NODE_ENV) {
    case "development":
        config({ path: ".env.development" })
        break
    case "production":
        config({ path: ".env.production" })
        break
    default:
        config({ path: ".env" })
        break
}

import express, { Request, Response } from "express"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerConfig from "../swagger.json"
import morgan from "morgan"
import cors from "cors"
import i18n from "./configs/i18n"
import { connectDB, sequelize } from "./db/config"
import rolesRouter from "./routers/roles.router"
import permissionsRouter from "./routers/permissions.router"
import userRouter from "./routes/userRoutes"

const app = express()
const PORT = parseInt(<string> process.env.PORT, 10) || 4000

app.set("secretKey", process.env.SECRET_KEY)
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(i18n.init)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerConfig)))
app.use("/api/roles", rolesRouter)
app.use("/api/permissions", permissionsRouter)
app.use("/api/users", userRouter)
app.get("/api", (_req: Request, res: Response) => res.status(200).send({ message: res.__("greeting"), status: "RUNNING" }))

app.listen(PORT, async () => {
    console.info(`Server started at: http://localhost:${PORT}`)
    await connectDB()
    sequelize.sync({ force: false }).then(() => {
        console.log("Synced database successfully...")
    })
})
