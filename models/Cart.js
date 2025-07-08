const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    ref: 'Product',
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Cart', cartSchema);