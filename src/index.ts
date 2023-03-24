import { config } from "dotenv"

config({})

import express, { Request, Response } from "express"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerConfig from "../swagger.json"
import morgan from "morgan"
import cors from "cors"
import i18n from "./configs/i18n"
import { connectDB, sequelize } from "./db/config"
import RolesRouter from "./routers/roles.router"

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(i18n.init)

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerConfig))
)
app.use("/api/roles", RolesRouter)
app.get("", (req: Request, res: Response) => {
    res.status(200).send({ message: res.__("greeting"), serverStatus: "RUNNING" })
})


app.listen(PORT, async () => {
    console.info(`Server started at: http://localhost:${PORT}`)
    await connectDB()
    sequelize.sync({ force: false }).then(() => {
        console.log("Synced database successfully...")
    })
})
