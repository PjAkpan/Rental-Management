"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const tenantRoutes_1 = __importDefault(require("./routes/tenantRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
// Import the Supabase client
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use the routes for handling requests
app.use('/api/rooms', roomRoutes_1.default);
app.use('/api/tenants', tenantRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
// Endpoint to test Supabase connection
app.get('/api/supabase-test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test querying Supabase (example: fetch data from 'rooms' table)
        const { data, error } = yield supabase.from('rooms').select('*');
        if (error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(200).json({ rooms: data });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to connect to Supabase', details: err });
    }
}));
const PORT = process.env.PORT || 5000;
db_config_1.default
    .authenticate()
    .then(() => {
    console.log('Database connected and models synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
