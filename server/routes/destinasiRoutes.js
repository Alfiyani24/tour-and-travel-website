
const express = require('express');
const router = express.Router();
const destinasiController = require('../controllers/destinasiController');


const generateDestinasiID = require('../utils/generateDestinasiID'); // Pastikan path ini benar
router.post('/', destinasiController.createDestinasi);
// Route to generate a new destinasi ID
router.post('/generate-id', async (req, res) => {
  try {
    const newDestinasiID = await generateDestinasiID();
    res.status(200).json({ DestinasiID: newDestinasiID });
  } catch (error) {
    console.error('Error generating destinasi ID:', error);
    res.status(500).json({ message: 'Failed to generate destinasi ID', error: error.message });
  }
});

module.exports = router;

// Get all destinasi
router.get('/', destinasiController.getAllDestinasi);

// Get a single destinasi by ID
router.get('/:DestinasiID', destinasiController.getDestinasiById);

// Update a destinasi by ID
router.put('/:DestinasiID', destinasiController.updateDestinasi);

// Delete a destinasi by ID
router.delete('/:DestinasiID', destinasiController.deleteDestinasi);

module.exports = router;
