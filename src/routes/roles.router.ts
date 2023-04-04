import express from "express";
import {
  deleteRoleById,
  getAllRoles,
  getRoleById,
  grantRolePermission,
  registerRole,
  updateRoleById,
} from "../controllers/roles.controller";
import { ModelOperation } from "../enums/permissions.enums";
import { verifyToken } from "../middlewares/auth.middlewares";
import { hasPermission } from "../middlewares/roles.middlewares";
import {
  newRoleValidation,
  rolePermissionValidation,
  updateRoleValidation,
} from "../validations/roles";

const router = express.Router();

router.post(
  "/grant-permission",
  rolePermissionValidation,
  verifyToken,
  //   hasPermission(ModelOperation.CREATE, "RolePermission"),
  grantRolePermission
);

router.post(
  "",
  newRoleValidation,
  verifyToken,
  hasPermission(ModelOperation.CREATE, "Role"),
  registerRole
);

router.get("/role/:roleId", verifyToken, getRoleById);

router.get("", verifyToken, getAllRoles);

router.put(
  "/:roleId",
  verifyToken,
  updateRoleValidation,
  hasPermission(ModelOperation.UPDATE, "Role"),
  updateRoleById
);

router.delete(
  ":/roleId",
  verifyToken,
  hasPermission(ModelOperation.DELETE, "Role"),
  deleteRoleById
);

export default router;
