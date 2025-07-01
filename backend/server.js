import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://subconcious-mind-regx.vercel.app',
  credentials: true
}));

app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error", err));

// Routes
import itemRoutes from './routes/Itemroute.js';
app.use('/apex/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
