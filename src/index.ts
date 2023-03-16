import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json";
import morgan from "morgan";
import cors from "cors"
import i18n from "./configs/i18n";
import { connectDB, sequelize } from "./db/config";
import { config } from "dotenv"

const app = express()
const PORT = process.env.PORT || 4000

config({})

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(i18n.init);

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerConfig))
)

/**
 * @openapi
 * /:
 *   get:
 *     description: Get sever status
 *     responses:
 *       200:
 *         description: Server status and welcome message
 */
app.get("", (req: Request, res: Response) => {
    res.status(200).send({ message: res.__('greeting'), serverStatus: "RUNNING" })
})


app.listen(PORT, async () => {
    console.info(`Server started at: http://localhost:${PORT}`)
    await connectDB()
    sequelize.sync({ force: false }).then(() => {
        console.log("Synced database successfully...")
    })
})
