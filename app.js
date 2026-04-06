import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import loyaltyRoutes from './routes/loyaltyRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/loyalty', loyaltyRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

export default app;
