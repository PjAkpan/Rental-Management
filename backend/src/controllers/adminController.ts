import { Request, Response } from 'express';

import { supabase } from '../services/supabase.service';

import { generateToken } from '../utilis/jwt.util';


export const adminSignup = async (req: Request, res: Response): Promise<void> => {
  try {

  const { name, email, password, role } = req.body;



  if (!name || !email || !password || !role) {

     res.status(400).json({ message: 'All fields are required' });
     return

  }



  if (!['owner', 'employee'].includes(role)) {

    res.status(400).json({ message: 'Invalid role' });
    return

  }



  const { data, error } = await supabase.from('admins').insert([{ name, email, password, role }]);



  if (error) {

    res.status(400).json({ message: error.message });
    return

  }



  res.status(201).json({ message: 'Admin registered successfully', admin: data });
} catch (error) {
  if (error instanceof Error) {
  res.status(500).json({ message: 'Internal server error', error: error.message });
} else {
  res.status(500).json({ message: 'An unknown error occurred' });
}
}
};



export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
  const { email, password } = req.body;



  if (!email || !password) {
   res.status(400).json({ message: 'All fields are required' });
   return
  }



  const { data: admin, error } = await supabase

    .from('admins')

    .select('*')

    .eq('email', email)

    .eq('password', password)

    .single();



  if (error || !admin) {

     res.status(401).json({ message: 'Invalid credentials' });
     return

  }



  const token = generateToken(admin.id, 'admin');



  res.status(200).json({ message: 'Login successful', token });
} catch (error) {
  if (error instanceof Error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } else {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
}
};

