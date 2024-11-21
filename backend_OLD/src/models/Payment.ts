import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import Tenant from './Tenant';

class Payment extends Model {}

Payment.init(
  {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    dueDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('Paid', 'Pending'), defaultValue: 'Pending' },
  },
  { sequelize, modelName: 'Payment' }
);

Tenant.hasMany(Payment);
Payment.belongsTo(Tenant);

export default Payment;
