import { DataTypes, Model } from "sequelize"
import { sequelize } from "../db/config"
import { BusStatus } from "../enums/bus.enums"

class Bus extends Model {
    declare id: string
    declare type: string
    declare plateNumber: string
    declare regNumber: string
    declare model: string
    declare manufacturer: string
    declare numOfSeats: number
    declare availbleSeats: number
    declare status: BusStatus
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
    },
    numOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    availbleSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM(...Object.values(BusStatus)),
        allowNull: false,
        defaultValue: BusStatus.STOPPED
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    modelName: "Bus"
})

export default Bus