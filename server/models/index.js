const Sequelize = require('sequelize');
const sequelize = require('../config/db'); // Atur koneksi Sequelize

const PaketTur = require('./PaketTur');
const DetailPaketTur = require('./DetailPaketTur');
const Destinasi = require('./Destinasi');

// Definisikan asosiasi
PaketTur.associate({ DetailPaketTur });
DetailPaketTur.associate({ PaketTur, Destinasi });

// Export models
module.exports = {
  PaketTur,
  DetailPaketTur,
  Destinasi,
};
