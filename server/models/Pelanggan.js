const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const logger = require('../utils/logger');

const Pelanggan = sequelize.define('Pelanggan', {
  PelangganID: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  NamaLengkap: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  Telepon: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  PASSWORD: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Role: {
    type: DataTypes.ENUM('customer', 'staff', 'tour guide'),
    defaultValue: 'customer',
    allowNull: false
  }
}, {
  tableName: 'Pelanggan',
  timestamps: false,
  hooks: {
    beforeCreate: async (pelanggan, options) => {
      if (!pelanggan.PelangganID) {
        const newID = await generatePelangganID();
        pelanggan.PelangganID = newID;
      }
    },
    afterCreate: (pelanggan, options) => {
      logger.info(`Pelanggan created: ${pelanggan.PelangganID} - ${pelanggan.NamaLengkap}`);
    },
    afterUpdate: (pelanggan, options) => {
      logger.info(`Pelanggan updated: ${pelanggan.PelangganID} - ${pelanggan.NamaLengkap}`);
    },
    afterDestroy: (pelanggan, options) => {
      logger.info(`Pelanggan deleted: ${pelanggan.PelangganID} - ${pelanggan.NamaLengkap}`);
    }
  }
});

module.exports = Pelanggan;
