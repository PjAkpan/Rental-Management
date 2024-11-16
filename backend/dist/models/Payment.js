"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Tenant_1 = __importDefault(require("./Tenant"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    paymentDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    dueDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM('Paid', 'Pending'), defaultValue: 'Pending' },
}, { sequelize: db_config_1.default, modelName: 'Payment' });
Tenant_1.default.hasMany(Payment);
Payment.belongsTo(Tenant_1.default);
exports.default = Payment;
