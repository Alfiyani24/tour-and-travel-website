const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Create a new itinerary
router.post('/', itineraryController.createItinerary);

// Get all itineraries
router.get('/', itineraryController.getAllItineraries);

// Get a single itinerary by ID
router.get('/:ItineraryID', itineraryController.getItineraryById);

// Update an itinerary by ID
router.put('/:ItineraryID', itineraryController.updateItinerary);

// Delete an itinerary by ID
router.delete('/:ItineraryID', itineraryController.deleteItinerary);

module.exports = router;
