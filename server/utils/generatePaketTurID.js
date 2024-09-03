const PaketTur = require('../models/PaketTur');

// Function to generate a new PaketTurID
const generatePaketTurID = async () => {
  // Find the latest PaketTur record
  const latestPaketTur = await PaketTur.findOne({
    order: [['PaketTurID', 'DESC']],
  });

  // If no records are found, start with 'PAKET001'
  if (!latestPaketTur) {
    return 'PAKET001';
  }

  // Extract the numeric part from the latest ID
  const lastID = latestPaketTur.PaketTurID;
  const lastNumber = parseInt(lastID.slice(5), 10); // Adjust slice based on your prefix length

  // Increment the number and format it with leading zeros
  const newIDNumber = lastNumber + 1;
  const newID = `PAKET${newIDNumber.toString().padStart(3, '0')}`;

  return newID;
};

module.exports = generatePaketTurID;
