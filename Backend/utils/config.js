import 'dotenv/config';

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 5000;

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [];