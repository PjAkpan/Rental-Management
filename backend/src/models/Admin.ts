import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';

interface AdminAttributes {
  id: number;
  username: string;
  password: string;
  role: string;
}

// Make 'id' optional for creation
interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

export default class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'owner' | 'employee';
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('owner', 'employee'),
      defaultValue: 'employee',
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
);
