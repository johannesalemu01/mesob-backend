import Restaurant from '../models/restaurant.js';

export const getAllRestaurants = async (req, res) => {
  const { cuisine } = req.query;
  try {
    const filter = { isOpen: true };
    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: 'i' };
    }
    const restaurants = await Restaurant.find(filter);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  const restaurantData = req.body;
  const newRestaurant = new Restaurant(restaurantData);

  try {
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const searchRestaurants = async (req, res) => {
  const { query } = req.query;
  try {
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { cuisine: { $regex: query, $options: 'i' } },
        { 'location.address': { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNearbyRestaurants = async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query; // radius in meters, default 5km

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const lngNum = parseFloat(lng);
    const latNum = parseFloat(lat);
    const radiusNum = parseInt(radius);

    const restaurants = await Restaurant.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lngNum, latNum],
          },
          $maxDistance: radiusNum,
        },
      },
      isOpen: true,
    });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
