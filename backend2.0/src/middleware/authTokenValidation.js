import jwt from 'jsonwebtoken';
import { prisma } from '../config/dbConfig.js';

export const authTokenValidation = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({where: {id: decoded.id}});
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}