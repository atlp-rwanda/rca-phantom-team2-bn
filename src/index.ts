import express, { Request, Response, NextFunction } from 'express'
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json"
import morgan from "morgan";
import cors from "cors"
import i18n from "./configs/i18n";
import path from 'path';

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"));
app.use(i18n.init);
  
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerConfig)));

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
    // req.setLocale("fr");
    res.status(200).send({ message: res.__('greeting'), serverStatus: "RUNNING" });
});


app.listen(PORT, () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})