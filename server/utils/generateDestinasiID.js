const Destinasi = require('../models/Destinasi');

// Function to generate a new DestinasiID
const generateDestinasiID = async () => {
  // Find the latest Destinasi record
  const latestDestinasi = await Destinasi.findOne({
    order: [['DestinasiID', 'DESC']],
  });

  // If no records are found, start with 'DEST001'
  if (!latestDestinasi) {
    return 'DEST001';
  }

  // Extract the numeric part from the latest ID
  const lastID = latestDestinasi.DestinasiID;
  const lastNumber = parseInt(lastID.slice(4), 10); // Extract numeric part after 'DEST'
  
  // Increment the number and format it with leading zeros
  const newIDNumber = lastNumber + 1;
  const newID = `DEST${newIDNumber.toString().padStart(3, '0')}`; // Format ID with leading zeros

  return newID;
};

module.exports = generateDestinasiID;
