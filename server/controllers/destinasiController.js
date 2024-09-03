// const Destinasi = require('../models/Destinasi');
// const generateDestinasiID = require('../utils/generateDestinasiID'); // Impor dari folder utils
// // Create a new destinasi
// exports.createDestinasi = async (req, res) => {
//   try {
//     const { NamaDestinasi } = req.body;

//     if (!NamaDestinasi) {
//       return res.status(400).json({ message: 'NamaDestinasi cannot be null or empty' });
//     }

//     const newDestinasiID = await generateDestinasiID();
//     console.log(`Creating Destinasi with ID: ${newDestinasiID}`);

//     const newDestinasi = await Destinasi.create({ DestinasiID: newDestinasiID, NamaDestinasi });
//     res.status(201).json({ message: 'Destinasi created successfully', newDestinasi });
//   } catch (error) {
//     console.error('Error creating destinasi:', error);
//     res.status(500).json({ message: 'Failed to create destinasi', error: error.message });
//   }
// };

// // Read all destinasi
// exports.getAllDestinasi = async (req, res) => {
//   try {
//     const destinasiList = await Destinasi.findAll();
//     res.status(200).json(destinasiList);
//   } catch (error) {
//     console.error('Error fetching destinasi:', error);
//     res.status(500).json({ message: 'Failed to fetch destinasi', error: error.message });
//   }
// };

// // Read a single destinasi by ID
// exports.getDestinasiById = async (req, res) => {
//   try {
//     const { DestinasiID } = req.params;
//     const destinasi = await Destinasi.findByPk(DestinasiID);

//     if (!destinasi) {
//       return res.status(404).json({ message: 'Destinasi not found' });
//     }

//     res.status(200).json(destinasi);
//   } catch (error) {
//     console.error('Error fetching destinasi:', error);
//     res.status(500).json({ message: 'Failed to fetch destinasi', error: error.message });
//   }
// };

// // Update a destinasi by ID
// exports.updateDestinasi = async (req, res) => {
//   try {
//     const { DestinasiID } = req.params;
//     const { NamaDestinasi } = req.body;

//     const destinasi = await Destinasi.findByPk(DestinasiID);

//     if (!destinasi) {
//       return res.status(404).json({ message: 'Destinasi not found' });
//     }

//     destinasi.NamaDestinasi = NamaDestinasi || destinasi.NamaDestinasi;
//     await destinasi.save();

//     res.status(200).json({ message: 'Destinasi updated successfully', destinasi });
//   } catch (error) {
//     console.error('Error updating destinasi:', error);
//     res.status(500).json({ message: 'Failed to update destinasi', error: error.message });
//   }
// };

// // Delete a destinasi by ID
// exports.deleteDestinasi = async (req, res) => {
//   try {
//     const { DestinasiID } = req.params;

//     const destinasi = await Destinasi.findByPk(DestinasiID);

//     if (!destinasi) {
//       return res.status(404).json({ message: 'Destinasi not found' });
//     }

//     await destinasi.destroy();
//     res.status(200).json({ message: 'Destinasi deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting destinasi:', error);
//     res.status(500).json({ message: 'Failed to delete destinasi', error: error.message });
//   }
// };

const Destinasi = require('../models/Destinasi');
const generateDestinasiID = require('../utils/generateDestinasiID');

// Create a new destinasi
exports.createDestinasi = async (req, res) => {
  try {
    const { NamaDestinasi } = req.body;

    if (!NamaDestinasi) {
      return res.status(400).json({ message: 'NamaDestinasi cannot be null or empty' });
    }

    const newDestinasiID = await generateDestinasiID();
    if (!newDestinasiID) {
      return res.status(500).json({ message: 'Failed to generate new Destinasi ID' });
    }

    console.log(`Creating Destinasi with ID: ${newDestinasiID}`);

    const newDestinasi = await Destinasi.create({ DestinasiID: newDestinasiID, NamaDestinasi });
    res.status(201).json({ message: 'Destinasi created successfully', newDestinasi });
  } catch (error) {
    console.error('Error creating destinasi:', error);
    res.status(500).json({ message: 'Failed to create destinasi', error: error.message });
  }
};


// Read all destinasi
exports.getAllDestinasi = async (req, res) => {
  try {
    const destinasiList = await Destinasi.findAll();
    res.status(200).json(destinasiList);
  } catch (error) {
    console.error('Error fetching destinasi:', error);
    res.status(500).json({ message: 'Failed to fetch destinasi', error: error.message });
  }
};

// Read a single destinasi by ID
exports.getDestinasiById = async (req, res) => {
  try {
    const { DestinasiID } = req.params;
    const destinasi = await Destinasi.findByPk(DestinasiID);

    if (!destinasi) {
      return res.status(404).json({ message: 'Destinasi not found' });
    }

    res.status(200).json(destinasi);
  } catch (error) {
    console.error('Error fetching destinasi:', error);
    res.status(500).json({ message: 'Failed to fetch destinasi', error: error.message });
  }
};

// Update a destinasi by ID
exports.updateDestinasi = async (req, res) => {
  try {
    const { DestinasiID } = req.params;
    const { NamaDestinasi } = req.body;

    const destinasi = await Destinasi.findByPk(DestinasiID);

    if (!destinasi) {
      return res.status(404).json({ message: 'Destinasi not found' });
    }

    destinasi.NamaDestinasi = NamaDestinasi || destinasi.NamaDestinasi;
    await destinasi.save();

    res.status(200).json({ message: 'Destinasi updated successfully', destinasi });
  } catch (error) {
    console.error('Error updating destinasi:', error);
    res.status(500).json({ message: 'Failed to update destinasi', error: error.message });
  }
};

// Delete a destinasi by ID
exports.deleteDestinasi = async (req, res) => {
  try {
    const { DestinasiID } = req.params;

    const destinasi = await Destinasi.findByPk(DestinasiID);

    if (!destinasi) {
      return res.status(404).json({ message: 'Destinasi not found' });
    }

    await destinasi.destroy();
    res.status(200).json({ message: 'Destinasi deleted successfully' });
  } catch (error) {
    console.error('Error deleting destinasi:', error);
    res.status(500).json({ message: 'Failed to delete destinasi', error: error.message });
  }
};

