import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  searchRestaurants,
  getNearbyRestaurants,
} from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/nearby', getNearbyRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);

export default router;
