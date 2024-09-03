const Itinerary = require('../models/Itinerary');

// Function to generate a new ID
const generateItineraryID = async () => {
  const latestItinerary = await Itinerary.findOne({
    order: [['ItineraryID', 'DESC']],
  });

  if (!latestItinerary) {
    return 'IT000';
  }

  const lastID = latestItinerary.ItineraryID;
  const newIDNumber = parseInt(lastID.slice(2), 10) + 1;
  const newID = `IT${newIDNumber.toString().padStart(3, '0')}`;

  return newID;
};

// Create a new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { PaketTurID, Hari, Aktivitas } = req.body;

    // Generate a new ItineraryID
    const newItineraryID = await generateItineraryID();

    // Create a new itinerary
    const newItinerary = await Itinerary.create({ ItineraryID: newItineraryID, PaketTurID, Hari, Aktivitas });
    res.status(201).json({ message: 'Itinerary created successfully', newItinerary });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Read all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraryList = await Itinerary.findAll();
    res.status(200).json(itineraryList);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Read a single itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const { ItineraryID } = req.params;
    const itinerary = await Itinerary.findByPk(ItineraryID);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an itinerary by ID
exports.updateItinerary = async (req, res) => {
  try {
    const { ItineraryID } = req.params;
    const { PaketTurID, Hari, Aktivitas } = req.body;

    const itinerary = await Itinerary.findByPk(ItineraryID);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.PaketTurID = PaketTurID || itinerary.PaketTurID;
    itinerary.Hari = Hari || itinerary.Hari;
    itinerary.Aktivitas = Aktivitas || itinerary.Aktivitas;
    await itinerary.save();

    res.status(200).json({ message: 'Itinerary updated successfully', itinerary });
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an itinerary by ID
exports.deleteItinerary = async (req, res) => {
  try {
    const { ItineraryID } = req.params;

    const itinerary = await Itinerary.findByPk(ItineraryID);

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    await itinerary.destroy();
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
