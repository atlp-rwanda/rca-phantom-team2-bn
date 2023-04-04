import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Role"
})

export default Role
