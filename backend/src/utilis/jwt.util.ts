import jwt from 'jsonwebtoken';



const SECRET_KEY = 'your_secret_key';



export const generateToken = (id: string, role: string): string => {

  return jwt.sign({ id, role }, SECRET_KEY, { expiresIn: '1h' });

};



export const verifyToken = (token: string) => {

  try {

    return jwt.verify(token, SECRET_KEY);

  } catch (error) {

    return null;

  }

};