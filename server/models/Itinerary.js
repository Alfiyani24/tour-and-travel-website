const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Itinerary = sequelize.define('Itinerary', {
  ItineraryID: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  PaketTurID: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Hari: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Aktivitas: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Itinerary',
  timestamps: false,
});

module.exports = Itinerary;
