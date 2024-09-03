
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PaketTur = sequelize.define('PaketTur', {
  PaketTurID: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  NamaPaket: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Deskripsi: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  HargaPaket: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Durasi: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Gambar: {
    type: DataTypes.BLOB('long'),
    defaultValue: null
  },
  NamaGambar: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  Kategori: {
    type: DataTypes.ENUM('domestik', 'internasional'),
    allowNull: false
  },
  KategoriSeason: {
    type: DataTypes.ENUM('high season', 'low season'),
    allowNull: false
  },
  include: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  exclude: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  Kuota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  MeetingPoint: {
    type: DataTypes.STRING(255),
    defaultValue: null
  }
}, {
  tableName: 'pakettur',
  timestamps: true
});

// Mendefinisikan asosiasi
PaketTur.associate = models => {
  PaketTur.hasMany(models.DetailPaketTur, { foreignKey: 'PaketTurID' });
};

module.exports = PaketTur;
