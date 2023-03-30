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
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "routes",
    sequelize,
  }
);

export default RouteModel;
