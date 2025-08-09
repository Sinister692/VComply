const mongoose = require('mongoose');

const ItineraryItemSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  itinerary: [ItineraryItemSchema],
}, {
  timestamps: true,
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
