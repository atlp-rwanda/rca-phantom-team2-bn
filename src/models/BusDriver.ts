import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"
import User from "./User"
import Bus from "./Bus"

class BusDriver extends Model {
    declare id: string
    declare busId: string
    declare driverId: string
}

BusDriver.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        busId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Bus,
                key: "id",
            },
        },
        driverId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize: sequelize,
        timestamps: true,
        modelName: "BusDriver",
    }
)

export default BusDriver
