const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PaketTur = require('./PaketTur');
const Destinasi = require('./Destinasi');

const DetailPaketTur = sequelize.define('DetailPaketTur', {
  PaketTurID: {
    type: DataTypes.STRING(10),
    references: {
      model: PaketTur,
      key: 'PaketTurID'
    },
    primaryKey: true
  },
  DestinasiID: {
    type: DataTypes.STRING(10),
    references: {
      model: Destinasi,
      key: 'DestinasiID'
    },
    primaryKey: true
  }
}, {
  tableName: 'DetailPaketTur',
  timestamps: false
});

DetailPaketTur.associate = models => {
  DetailPaketTur.belongsTo(models.PaketTur, { foreignKey: 'PaketTurID' });
  DetailPaketTur.belongsTo(models.Destinasi, { foreignKey: 'DestinasiID' });
};

module.exports = DetailPaketTur;
