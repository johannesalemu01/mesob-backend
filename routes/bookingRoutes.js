import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import {
  getAllRestaurants,
  getRestaurantById,
  searchRestaurants,
  createRestaurant,
} from '../controllers/restaurantController.js';
import supabaseAuth from '../middlewares/supabaseAuth.js';

const router = express.Router();

// Restaurant Routes
router.get('/restaurants', getAllRestaurants);
router.get('/restaurants/search', searchRestaurants);
router.get('/restaurants/:id', getRestaurantById);
router.post('/restaurants', createRestaurant); // Ideally admin protected

// Booking Routes (Protected)
router.post('/', supabaseAuth, createBooking);
router.get('/my-bookings', supabaseAuth, getUserBookings);
router.patch('/cancel/:id', supabaseAuth, cancelBooking);
router.patch('/:id/status', supabaseAuth, updateBookingStatus);

export default router;
