import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"
import Role from "./Role"

class UserModel extends Model { }

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Role,
            key: "id"
        }
    }
},
{
    modelName: "User",
    timestamps: true,
    sequelize,
})

export default UserModel
