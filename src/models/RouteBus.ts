import { Model } from "sequelize"
import { sequelize, DataTypes } from "../db/config"
import Route from "./Route"
import Bus from "./Bus"

class RouteBus extends Model {
    declare id: string
    declare routeId: string
    declare busId: string
}

RouteBus.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        routeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Route,
                key: "id",
            },
        },
        busId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Bus,
                key: "id",
            },
        },
    },
    {
        sequelize: sequelize,
        timestamps: true,
        modelName: "RouteBus",
    }
)

export default RouteBus
