import express from 'express';
import { verifyToken, verifyOwner } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Example route to register a new employee (only allowed by the owner)
router.post('/register-employee', verifyToken, verifyOwner, (req, res) => {
    res.json({ message: 'Employee registered successfully' });
  });

export default router;
