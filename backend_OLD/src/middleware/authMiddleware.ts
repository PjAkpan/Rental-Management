import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken'; 
import { verifyToken } from '../utilis/jwt.util';

import { supabase } from '../services/supabase.service';

interface TokenPayload extends JwtPayload {
  id: string;
  role: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
  const token = req.headers.authorization?.split(' ')[1];



  if (!token) {

     res.status(401).json({ message: 'No token provided' });
     return

  }



  const decoded = verifyToken(token) as TokenPayload | null; 

  if (!decoded) {

     res.status(401).json({ message: 'Invalid or expired token' });
     return

  }



  const { data: user, error } = await supabase

    .from(decoded.role === 'admin' ? 'admins' : 'users')

    .select('*')

    .eq('id', decoded.id)

    .single();



  if (error || !user) {

  res.status(401).json({ message: 'User not found' });
  return

  }



  (req as any).user = user; 

  next();
} catch (error) {
  if (error instanceof Error) {
  next(error); 
} else {
  next(new Error('An unknown error occurred'));
}
}
};



export const authorizeRole = (requiredRole: string) => {

  return (req: Request, res: Response, next: NextFunction): void => {

    const user = (req as any).user;



    if (user.role !== requiredRole) {

     res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
     return

    }



    next();

  };

};