import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongooseUri = process.env.DATABASE;
const database = async () => {
  await mongoose.connect(mongooseUri, { dbName: process.env.DBNAME });
};

export default database;
