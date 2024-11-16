"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define payment-related routes here
router.get('/payments', (req, res) => {
    res.send('List of payments');
});
router.post('/payments', (req, res) => {
    res.send('Process a new payment');
});
// Export the router
exports.default = router;
