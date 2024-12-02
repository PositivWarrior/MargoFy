import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb'; // Replace with your MongoDB URI
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};
