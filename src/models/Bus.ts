import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db/config"

class Bus extends Model {}

Bus.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Bus"
})

export default Bus