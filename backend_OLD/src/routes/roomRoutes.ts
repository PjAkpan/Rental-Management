import express from 'express';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../controllers/roomController';

const router = express.Router();

router.get('/rooms', getRooms);
router.post('/rooms', addRoom);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

export default router;
