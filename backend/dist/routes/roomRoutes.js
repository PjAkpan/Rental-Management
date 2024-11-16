"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const router = express_1.default.Router();
router.get('/rooms', roomController_1.getRooms);
router.post('/rooms', roomController_1.addRoom);
router.put('/rooms/:id', roomController_1.updateRoom);
router.delete('/rooms/:id', roomController_1.deleteRoom);
exports.default = router;
