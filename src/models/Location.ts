import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/config";

class Location extends Model {
  public id!: number;
  public name!: string;
  public latitude!: number;
  public longitude!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Location.init(
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
    tableName: "Locations",
    sequelize,
  }
);

export default Location;
