"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define your routes here
router.get('/tenants', (req, res) => {
    res.send('List of tenants');
});
router.post('/tenants', (req, res) => {
    res.send('Add a new tenant');
});
// Export the router
exports.default = router;
