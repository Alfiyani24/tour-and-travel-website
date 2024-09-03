const Itinerary = require('../models/Itinerary');

// Function to generate a new ItineraryID
const generateItineraryID = async () => {
  // Find the latest Itinerary record
  const latestItinerary = await Itinerary.findOne({
    order: [['ItineraryID', 'DESC']],
  });

  // If no records are found, start with 'ITIN001'
  if (!latestItinerary) {
    return 'ITIN001';
  }

  // Extract the numeric part from the latest ID
  const lastID = latestItinerary.ItineraryID;
  const lastNumber = parseInt(lastID.slice(4), 10); // Extract number after 'ITIN'

  // Increment the number and format it with leading zeros
  const newIDNumber = lastNumber + 1;
  const newID = `ITIN${newIDNumber.toString().padStart(3, '0')}`;

  return newID;
};

module.exports = generateItineraryID;
