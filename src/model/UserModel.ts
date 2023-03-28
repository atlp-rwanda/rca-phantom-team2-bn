import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"

class UserModel extends Model {
    public id!: number
    public firstName!: string
    public lastName!: string
    public email!: string
    public password!: string
    public role!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            autoIncrement: true,
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize,
    },
)

export default UserModel
