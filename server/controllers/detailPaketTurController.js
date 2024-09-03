const DetailPaketTur = require('../models/DetailPaketTur');

// Create a new DetailPaketTur
exports.createDetailPaketTur = async (req, res) => {
  try {
    const { PaketTurID, DestinasiID } = req.body;
    const detailPaketTur = await DetailPaketTur.create({ PaketTurID, DestinasiID });
    res.status(201).json(detailPaketTur);
  } catch (error) {
    res.status(500).json({ message: 'Error creating DetailPaketTur', error });
  }
};

// Read all DetailPaketTur
exports.getAllDetailPaketTur = async (req, res) => {
  try {
    const details = await DetailPaketTur.findAll();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching DetailPaketTur', error });
  }
};

// Read a single DetailPaketTur by primary key
exports.getDetailPaketTurById = async (req, res) => {
  try {
    const { PaketTurID, DestinasiID } = req.params;
    const detail = await DetailPaketTur.findOne({ where: { PaketTurID, DestinasiID } });
    if (detail) {
      res.status(200).json(detail);
    } else {
      res.status(404).json({ message: 'DetailPaketTur not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching DetailPaketTur', error });
  }
};

// Update a DetailPaketTur
exports.updateDetailPaketTur = async (req, res) => {
  try {
    const { PaketTurID, DestinasiID } = req.params;
    const { newPaketTurID, newDestinasiID } = req.body;
    const [updated] = await DetailPaketTur.update(
      { PaketTurID: newPaketTurID, DestinasiID: newDestinasiID },
      { where: { PaketTurID, DestinasiID } }
    );
    if (updated) {
      const updatedDetail = await DetailPaketTur.findOne({ where: { PaketTurID: newPaketTurID, DestinasiID: newDestinasiID } });
      res.status(200).json(updatedDetail);
    } else {
      res.status(404).json({ message: 'DetailPaketTur not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating DetailPaketTur', error });
  }
};

// Delete a DetailPaketTur
exports.deleteDetailPaketTur = async (req, res) => {
  try {
    const { PaketTurID, DestinasiID } = req.params;
    const deleted = await DetailPaketTur.destroy({ where: { PaketTurID, DestinasiID } });
    if (deleted) {
      res.status(200).json({ message: 'DetailPaketTur deleted' });
    } else {
      res.status(404).json({ message: 'DetailPaketTur not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting DetailPaketTur', error });
  }
};
