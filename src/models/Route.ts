import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db/config"
import Location from "./Location"

class Route extends Model {
    public id!: number
    public name!: string
    public origin!: string
    public destination!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Route.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.UUID,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: Location,
                key: "id",
            },
        },
        destination: {
            type: DataTypes.UUID,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: Location,
                key: "id",
            },
        },
    },
    {
        tableName: "Route",
        sequelize,
    }
)

export default Route
