import express from "express";
import authJwt from "../middleware/auth";
import {
  createLocationValidation,
  updateLocationValidation,
} from "../validations/locationValidations";
import {
  createLocation,
  deleteLocationById,
  findLocationById,
  getAllLocations,
  updateLocationById,
} from "../controllers/locationController";

const locationRouter = express.Router();

locationRouter.post(
  "/",
  authJwt.verifyToken,
  createLocationValidation,
  createLocation
);
locationRouter.get("/", authJwt.verifyToken, getAllLocations);
locationRouter.get("/:id", authJwt.verifyToken, findLocationById);
locationRouter.put(
  "/:id",
  authJwt.verifyToken,
  updateLocationValidation,
  updateLocationById
);
locationRouter.delete("/:id", authJwt.verifyToken, deleteLocationById);

export default locationRouter;
