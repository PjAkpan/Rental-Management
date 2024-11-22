import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import bcrypt from 'bcryptjs';

interface AdminAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  resetToken?: string  | null;
  resetTokenExpires?: Date | null;
}

// Make 'id' optional for creation
interface AdminCreationAttributes extends Optional<AdminAttributes, 'id' | 'resetToken' | 'resetTokenExpires'> {}


export default class Admin extends Model<AdminAttributes, AdminCreationAttributes> {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string; 
  public role!: 'owner' | 'employee';
  public resetToken?: string;
  public resetTokenExpires?: Date;
}

// Hash password before saving it
Admin.beforeCreate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10); // Hash the password with a salt of 10
  }
});

Admin.beforeUpdate(async (admin) => {
  if (admin.password) {
    admin.password = await bcrypt.hash(admin.password, 10); // Hash the new password if updated
  }
});


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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
);
