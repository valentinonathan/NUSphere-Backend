import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = 'test';
process.env.JWT_PASSWORD = process.env.JWT_PASSWORD || 'test-secret';
