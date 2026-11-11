import 'dotenv/config';
import express, { json } from 'express';
import connectDatabase from './config/db.js';
import { User } from './models/User.js';
import { Category } from './models/Category.js';
import categoryRoutes from './routes/categoryRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid port number in the environment.');
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body.' });
  }

  console.error('Request failed:', error.name);
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

const startServer = async () => {
  await connectDatabase();
  await User.init();
  await Category.init();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exitCode = 1;
});
