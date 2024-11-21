import { Request, Response } from 'express';

import { supabase } from '../services/supabase.service';

import { generateToken } from '../utilis/jwt.util';



export const userSignup = async (req: Request, res: Response): Promise<void> => {

  const { name, email, password } = req.body;



  if (!name || !email || !password) {

    res.status(400).json({ message: 'All fields are required' });
    return

  }



  const { data, error } = await supabase.from('users').insert([{ name, email, password }]);



  if (error) {

     res.status(400).json({ message: error.message });
     return

  }



  res.status(201).json({ message: 'User registered successfully', user: data });

};



export const userLogin = async (req: Request, res: Response): Promise<void> => {

  const { email, password } = req.body;



  if (!email || !password) {

     res.status(400).json({ message: 'All fields are required' });
     return

  }



  const { data: user, error } = await supabase

    .from('users')

    .select('*')

    .eq('email', email)

    .eq('password', password)

    .single();



    if (error || !user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }



  const token = generateToken(user.id, 'client');



  res.status(200).json({ message: 'Login successful', token });

};

