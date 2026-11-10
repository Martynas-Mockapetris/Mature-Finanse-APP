import { connect } from 'mongoose';

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the environment.');
  }

  await connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

export default connectDatabase;
