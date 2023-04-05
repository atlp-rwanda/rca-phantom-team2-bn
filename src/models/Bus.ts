import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db/config"

class Bus extends Model {
    declare id: string
    declare type: string
    declare plateNumber: string
    declare regNumber: string
    declare model: string
    declare manufacturer: string
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
        allowNull: false,
        unique: true
    },
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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