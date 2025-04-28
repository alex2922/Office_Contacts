import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();


const prisma  = new PrismaClient();


const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    return true;
  } catch (error) {
    console.log('Error connecting to database', error);
    throw error;
  }
};

export { prisma, connectDB };