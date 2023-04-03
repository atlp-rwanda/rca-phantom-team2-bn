import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/config";
import Location from "./Location";

class RouteModel extends Model {
  public id!: number;
  public name!: string;
  public origin!: string;
  public destination!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RouteModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.fn("uuid_generate_v4"),
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
    tableName: "Routes",
    sequelize,
  }
);

export default RouteModel;
