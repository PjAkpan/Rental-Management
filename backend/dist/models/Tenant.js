"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Room_1 = __importDefault(require("./Room"));
class Tenant extends sequelize_1.Model {
}
Tenant.init({
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { sequelize: db_config_1.default, modelName: 'Tenant' });
Room_1.default.hasOne(Tenant);
Tenant.belongsTo(Room_1.default);
exports.default = Tenant;
