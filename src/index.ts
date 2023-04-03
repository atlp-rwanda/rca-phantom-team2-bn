import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerConfig from "../swagger.json";
import morgan from "morgan";
import cors from "cors";
import i18n from "./configs/i18n";
import { connectDB, sequelize } from "./db/config";
import { config } from "dotenv";
import session from "express-session";
import userRouter from "./routes/userRoutes";
import routeRouter from "./routes/routeRoutes";
import locationRouter from "./routes/locationRoutes";

switch (process.env.NODE_ENV) {
  case "development":
    config({ path: ".env.development" });
    break;
  case "production":
    config({ path: ".env.production" });
    break;
  default:
    config({ path: ".env" });
    break;
}

const app = express();
// const PORT = process.env.PORT || 4000
const PORT: number = parseInt(<string>process.env.PORT, 10) || 4000;

app.set("secretKey", process.env.SECRET_KEY);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(i18n.init);
app.use(
  session({
    secret: (process.env.SESSION_SECRET as string) || "phantom_session",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerConfig))
);

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
  res
    .status(200)
    .send({ message: res.__("greeting"), serverStatus: "RUNNING" });
});
app.use("/api/users", userRouter);

app.use("/api/routes", routeRouter);
app.use("/api/locations", locationRouter);

app.listen(PORT, () => {
  console.info(`Server started at: http://localhost:${PORT}`);
  connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("Synced database successfully...");
    app.emit("appStarted");
  });
});

export default app;
