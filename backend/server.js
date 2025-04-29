import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend opérationnel' });
});

// Routes principales
app.use('/api/auth', (req, res, next) => {
  console.log('➡️  Appel à /api/auth');
  next();
}, authRoutes);

app.use('/api/profile', (req, res, next) => {
  console.log('➡️  Appel à /api/profile');
  next();
}, profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});