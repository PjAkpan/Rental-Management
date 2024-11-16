"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Room extends sequelize_1.Model {
}
Room.init({
    roomNumber: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM('Occupied', 'Vacant'), defaultValue: 'Vacant' },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
}, { sequelize: db_config_1.default, modelName: 'Room' });
exports.default = Room;
