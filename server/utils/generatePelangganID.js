const Pelanggan = require('../models/Pelanggan');

// Function to generate a new PelangganID
const generatePelangganID = async () => {
  try {
    // Find the latest Pelanggan record
    const latestPelanggan = await Pelanggan.findOne({
      order: [['PelangganID', 'DESC']],
    });

    // If no records are found, start with 'P001'
    if (!latestPelanggan) {
      return 'P001';
    }

    // Extract the numeric part from the latest ID
    const lastID = latestPelanggan.PelangganID;
    const lastNumber = parseInt(lastID.slice(1), 10); // Extract numeric part after 'P'

    // Increment the number and format it with leading zeros
    const newIDNumber = lastNumber + 1;
    const newID = `P${newIDNumber.toString().padStart(3, '0')}`; // Format ID with leading zeros

    return newID;
  } catch (error) {
    console.error('Error generating PelangganID:', error);
    throw new Error('Could not generate PelangganID');
  }
};

module.exports = generatePelangganID;
