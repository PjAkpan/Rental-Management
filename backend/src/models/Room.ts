import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

class Room extends Model {}

Room.init(
  {
    roomNumber: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('Occupied', 'Vacant'), defaultValue: 'Vacant' },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: 'Room' }
);

export default Room;
