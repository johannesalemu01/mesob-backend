import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/restaurant.js';

dotenv.config();

const restaurants = [
  {
    name: 'Mesob Traditional',
    description: 'Authentic Ethiopian dining experience with traditional decor and music.',
    cuisine: 'Traditional',
    location: {
      address: 'Abay Mado, Bahir Dar',
      coordinates: [37.39, 11.59]
    },
    images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800'],
    rating: 4.8,
    reviewsCount: 124,
    averagePrice: 350,
    isOpen: true,
    menu: [
      { name: 'Beyaynetu', price: 250, description: 'Assorted vegan dishes on injera', image: 'https://images.unsplash.com/photo-1626202378302-36c9a33608cc?w=400' },
      { name: 'Doro Wat', price: 450, description: 'Spicy chicken stew with egg', image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400' }
    ]
  },
  {
    name: 'The Modern Bistro',
    description: 'Contemporary fusion cuisine in a sleek, urban setting.',
    cuisine: 'Modern',
    location: {
      address: 'Abay Mado, near Tele',
      coordinates: [37.40, 11.60]
    },
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'],
    rating: 4.5,
    reviewsCount: 89,
    averagePrice: 550,
    isOpen: true,
    menu: [
      { name: 'Signature Burger', price: 300, description: 'Double patty with secret sauce', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
      { name: 'Pasta Carbonara', price: 280, description: 'Creamy pasta with bacon', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' }
    ]
  },
  {
    name: 'Green Leaf Vegan',
    description: 'Fresh, organic, and 100% plant-based delicacies.',
    cuisine: 'Vegan',
    location: {
      address: 'Piazza, Bahir Dar',
      coordinates: [37.38, 11.58]
    },
    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'],
    rating: 4.9,
    reviewsCount: 56,
    averagePrice: 400,
    isOpen: true,
    menu: [
      { name: 'Quinoa Bowl', price: 220, description: 'Rich in protein and flavor', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
      { name: 'Avocado Toast', price: 180, description: 'Classic breakfast favorite', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400' }
    ]
  },
  {
    name: 'Dolce Vita',
    description: 'Genuine Italian flavors, from wood-fired pizzas to handmade pasta.',
    cuisine: 'Italian',
    location: {
      address: 'Lake Shore, Bahir Dar',
      coordinates: [37.41, 11.61]
    },
    images: ['https://images.unsplash.com/photo-1498579150354-97251c0dfb6c?w=800'],
    rating: 4.7,
    reviewsCount: 210,
    averagePrice: 600,
    isOpen: true,
    menu: [
      { name: 'Margherita Pizza', price: 320, description: 'Classic tomato and mozzarella', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400' },
      { name: 'Lasagna', price: 380, description: 'Layered pasta with meat sauce', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    await Restaurant.insertMany(restaurants);
    console.log('Successfully seeded restaurants!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
