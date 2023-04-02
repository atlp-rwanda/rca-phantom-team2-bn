import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/config";

class RouteModel extends Model {
  public id!: number;
  public routeName!: string;
  public latitude!: number;
  public longitude!: number;
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
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "routes",
    sequelize,
  }
);

export default RouteModel;
