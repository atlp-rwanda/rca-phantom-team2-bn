import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"
import Role from "./Role"

class User extends Model {
    declare id: string
    declare firstName: string
    declare lastName: string
    declare email: string
    declare password: string
    declare roleId?: string
    declare resetPasswordToken: string
    declare resetPasswordExpires: number
}

User.init(
    {
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
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
            defaultValue: null,
            references: {
                model: Role,
                key: "id",
            },
        },
    },
    {
        modelName: "User",
        timestamps: true,
        sequelize,
    }
)

export default User
