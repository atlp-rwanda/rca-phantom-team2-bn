import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"
import Role from "./Role"

class User extends Model {
    id!: string
    firstName!: string
    lastName!: string
    email!: string
    password!: string
    roleId!: string
}

User.init({
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

export default User