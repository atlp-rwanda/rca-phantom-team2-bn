import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"
import User from "./User"

class UserToken extends Model {
    id!: string
    userId!: string
    resetPasswordToken!: string
    resetPasswordExpires!: Date
}

UserToken.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "UserToken"
})

export default UserToken