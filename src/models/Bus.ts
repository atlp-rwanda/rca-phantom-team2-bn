import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db/config"

class Bus extends Model {
    id!: string
    type!: string
    plateNumber!: string
    regNumber!: string
    model!: string
    manufacturer!: string
}

Bus.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Bus"
})

export default Bus