
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Pastikan file ini mengkonfigurasi koneksi Sequelize

const Destinasi = sequelize.define('Destinasi', {
  DestinasiID: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  NamaDestinasi: {
    type: DataTypes.STRING(100),
    allowNull: false, // Ensure that NamaDestinasi cannot be null
  },
}, {
  tableName: 'Destinasi',
  timestamps: false, // This means that Sequelize will not manage `createdAt` and `updatedAt` fields
});

module.exports = Destinasi;
