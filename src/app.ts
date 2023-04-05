import express, { Request, Response } from "express"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerConfig from "../swagger.json"
import morgan from "morgan"
import cors from "cors"
import i18n from "./configs/i18n"
import rolesRouter from "./routes/roles.router"
import permissionsRouter from "./routes/permissions.router"
import userRouter from "./routes/userRoutes"
import routeRouter from "./routes/routeRoutes"
import locationRouter from "./routes/locationRoutes"
import busesRouter from "./routes/buses.router"
import { connectDB } from "./db/config"

const app = express()

app.set("secretKey", process.env.SECRET_KEY)
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(i18n.init)

connectDB()

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerConfig))
)
app.use("/api/roles", rolesRouter)
app.use("/api/permissions", permissionsRouter)
app.use("/api/users", userRouter)
app.use("/api/buses", busesRouter)
app.use("/api/locations", locationRouter)
app.use("/api/routes", routeRouter)
app.get("/api", (_req: Request, res: Response) =>
    res.status(200).send({ message: res.__("greeting"), status: "RUNNING" })
)

export default app
