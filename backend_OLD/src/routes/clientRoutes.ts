import { Router } from 'express';

import { userSignup, userLogin } from '../controllers/clientController';



const clientRouter = Router();



clientRouter.post('/signup', userSignup);

clientRouter.post('/login', userLogin);



export default clientRouter;