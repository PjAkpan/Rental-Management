import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import Room from './Room';

class Tenant extends Model {}

Tenant.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'Tenant' }
);

Room.hasOne(Tenant);
Tenant.belongsTo(Room);

export default Tenant;
