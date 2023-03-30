import express from "express";
import { createRoute, findRouteById } from "../controllers/routeController";
import { createRouteValidation } from "../validations/routeValidations";

const userRouter = express.Router();

userRouter.post("/create", createRouteValidation, createRoute);
userRouter.get("/:id", findRouteById);

export default userRouter;
