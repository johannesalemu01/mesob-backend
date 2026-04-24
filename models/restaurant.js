import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    cuisine: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    menu: [
      {
        name: String,
        price: Number,
        description: String,
        image: String,
      },
    ],
    averagePrice: Number,
    isOpen: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.index({ "location.coordinates": "2dsphere" });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
