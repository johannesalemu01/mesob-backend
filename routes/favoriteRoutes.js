import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import supabaseAuth from '../middlewares/supabaseAuth.js';

const router = express.Router();

// All favorite routes require authentication
router.use(supabaseAuth);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:restaurantId', removeFavorite);

export default router;
