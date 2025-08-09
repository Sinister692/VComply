const Trip = require('../models/Trip');
const User = require('../models/User');

// @desc    Get user's trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id });
  res.json(trips);
};

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
  const { destination, startDate, endDate, itinerary } = req.body;

  const trip = new Trip({
    user: req.user._id,
    destination,
    startDate,
    endDate,
    itinerary,
  });

  const createdTrip = await trip.save();
  res.status(201).json(createdTrip);
};

// @desc    Get a single trip
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    res.json(trip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
  const { destination, startDate, endDate, itinerary } = req.body;

  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    trip.destination = destination || trip.destination;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.itinerary = itinerary || trip.itinerary;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    await trip.remove();
    res.json({ message: 'Trip removed' });
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
};


module.exports = {
  getTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip,
};
