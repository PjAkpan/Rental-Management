import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Admin  from '../models/Admin';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const signup = async (req: Request,  res: Response, next: NextFunction): Promise<void> => {
  const { username, password, role } = req.body;

  const existingAdmin = await Admin.findOne({ where: { username } });
  if (existingAdmin) {
    res.status(400).json({ message: 'Admin already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await Admin.create({ username, password: hashedPassword, role });
  

  const token = jwt.sign({ id: newAdmin.id, username: newAdmin.username, role: newAdmin.role }, SECRET_KEY, { expiresIn: '1h' });
  res.status(201).json({ message: 'Admin created successfully', token });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ where: { username } });
  if (!admin) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: 'Invalid credentials' });
    return ;
  }

  const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};
