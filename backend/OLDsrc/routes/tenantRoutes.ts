import express from 'express';
const router = express.Router();

// Define your routes here
router.get('/tenants', (req, res) => {
  res.send('List of tenants');
});

router.post('/tenants', (req, res) => {
  res.send('Add a new tenant');
});

// Export the router
export default router;
