import express from "express";
import {
  getAllModels,
  getAllPermissions,
  getSupportedOperations,
  registerNewPermission,
} from "../controllers/permissions.controller";
import { ModelOperation } from "../enums/permissions.enums";
import { verifyToken } from "../middlewares/auth.middlewares";
import { hasPermission } from "../middlewares/roles.middlewares";
import { newPermissionValidation } from "../validations/permissions";

const router = express.Router();

router.post(
  "",
  newPermissionValidation,
  verifyToken,
  hasPermission(ModelOperation.CREATE, "Permission"),
  registerNewPermission
);

router.get(
  "/operations",
  verifyToken,
  hasPermission(ModelOperation.VIEW, "Permission"),
  getSupportedOperations
);

router.get(
  "/models",
  verifyToken,
  hasPermission(ModelOperation.VIEW, "Permission"),
  getAllModels
);

router.get(
  "",
  verifyToken,
  hasPermission(ModelOperation.VIEW, "Permission"),
  getAllPermissions
);

export default router;
