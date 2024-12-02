import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
};
