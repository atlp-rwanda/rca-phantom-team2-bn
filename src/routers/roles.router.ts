import express from "express"
import { deleteRoleById, getAllRoles, getRoleById, registerRole, updateRoleById } from "../controllers/roles.controller"
import { newRoleValidation, updateRoleValidation } from "../validations/roleValidations"

const router = express.Router()

router.post("", newRoleValidation, registerRole)

router.get("/role/:roleId", getRoleById)

router.get("", getAllRoles)

router.put("/:roleId", updateRoleValidation, updateRoleById)

router.delete(":/roleId", deleteRoleById)

export default router