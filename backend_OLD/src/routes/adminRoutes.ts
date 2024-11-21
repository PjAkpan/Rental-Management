import { Router } from 'express';

import { adminSignup, adminLogin } from '../controllers/adminController';

import { authenticate, authorizeRole } from '../middleware/authMiddleware';



const adminRouter = Router();



adminRouter.post('/signup', adminSignup);

adminRouter.post('/login', adminLogin);



// Example of restricted route

adminRouter.get('/dashboard', authenticate, authorizeRole('owner'), (req, res) => {

  res.json({ message: 'Owner Dashboard' });

});



export default adminRouter;