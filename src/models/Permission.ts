import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"

class Permission extends Model {}

Permission.init({
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
    },
    operations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false
    },
    modelName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Permission" 
})

export default Permission