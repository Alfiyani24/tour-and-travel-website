

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Mengimpor instance sequelize dari konfigurasi
const PaketTur = require('../models/PaketTur');
const DetailPaketTur = require('../models/DetailPaketTur');
const Destinasi = require('../models/Destinasi');
const generatePaketTurID = require('../utils/generatePaketTurID');
const multer = require('multer');
const { Op } = require('sequelize');


// Konfigurasi multer untuk penyimpanan gambar dalam memori
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fungsi untuk membuat Paket Tur
exports.createPaketTur = [
  upload.single('Gambar'), // Middleware untuk mengunggah gambar
  async (req, res) => {
    const transaction = await sequelize.transaction(); // Memulai transaksi

    try {
      const { NamaPaket, Deskripsi, HargaPaket, Durasi, Kategori, KategoriSeason, include, exclude, Kuota, MeetingPoint, DestinasiList } = req.body;
      const GambarBuffer = req.file ? req.file.buffer : null; // Buffer gambar

      // Validasi data
      if (!NamaPaket || !HargaPaket || !Durasi || !Kategori || !KategoriSeason || !Kuota || !DestinasiList) {
        return res.status(400).json({ error: 'Semua field wajib diisi kecuali gambar dan destinasi' });
      }

      // Generate PaketTurID
      const newPaketTurID = await generatePaketTurID();
      console.log(`Creating PaketTur with ID: ${newPaketTurID}`);

      // Simpan data Paket Tur ke database
      const paketTur = await PaketTur.create({
        PaketTurID: newPaketTurID,
        NamaPaket, 
        Deskripsi,
        HargaPaket,
        Durasi,
        Gambar: GambarBuffer, // Simpan buffer gambar
        Kategori,
        KategoriSeason,
        include,
        exclude,
        Kuota,
        MeetingPoint
      }, { transaction });

      // Simpan data Detail Paket Tur ke database
      const detailPaketTurPromises = DestinasiList.map(destinasiID =>
        DetailPaketTur.create({
          PaketTurID: newPaketTurID,
          DestinasiID: destinasiID
        }, { transaction })
      );

      await Promise.all(detailPaketTurPromises);

      // Commit transaksi
      await transaction.commit();

      res.status(201).json({
        message: 'Paket Tur berhasil ditambahkan!',
        paketTur
      });
    } catch (error) {
      // Rollback transaksi jika terjadi kesalahan
      await transaction.rollback();
      console.error('Error creating PaketTur:', error.message);
      res.status(500).json({
        message: 'Gagal menambahkan Paket Tur',
        error: error.message
      });
    }
  }
];

exports.getAllPaketTur = async (req, res) => {
  try {
    const paketTurList = await PaketTur.findAll({
      include: [
        {
          model: DetailPaketTur,
          include: [Destinasi]
        }
      ]
    });

    // Map over the fetched PaketTur records to convert image data to base64
    const paketTurWithImages = paketTurList.map(paketTur => {
      let base64Image = null;

      // Check if Gambar is a buffer and convert to base64
      if (Buffer.isBuffer(paketTur.Gambar)) {
        base64Image = `data:image/jpeg;base64,${paketTur.Gambar.toString('base64')}`;
      } else if (paketTur.Gambar && paketTur.Gambar.data) {
        base64Image = `data:image/jpeg;base64,${Buffer.from(paketTur.Gambar.data).toString('base64')}`;
      }

      return {
        ...paketTur.toJSON(), // Convert Sequelize instance to plain object
        Gambar: base64Image, // Include the base64 image
      };
    });

    res.status(200).json(paketTurWithImages);
  } catch (error) {
    console.error('Error fetching PaketTur records:', error.message);
    res.status(500).json({
      message: 'Gagal mengambil data Paket Tur',
      error: error.message
    });
  }
};

exports.getPaketTurById = async (req, res) => {
  const { paketTurID } = req.params; // Ambil paketTurID dari req.params
  try {
    // Ambil PaketTur berdasarkan ID dengan detail destinasi
    const paketTur = await PaketTur.findByPk(paketTurID, {
      include: [
        {
          model: DetailPaketTur,
          include: [Destinasi]
        }
      ]
    });

    if (paketTur) {
      let base64Image = null;
      
      // Ensure Gambar is a buffer and convert it to a base64 string
      if (Buffer.isBuffer(paketTur.Gambar)) {
        base64Image = `data:image/jpeg;base64,${paketTur.Gambar.toString('base64')}`;
      }
     

      // Format hasil respons
      const result = {
        // PaketTurID: paketTur.PaketTurID,
        NamaPaket: paketTur.NamaPaket,
        Deskripsi: paketTur.Deskripsi,
        HargaPaket: paketTur.HargaPaket,
        Durasi: paketTur.Durasi,
        Gambar: base64Image, // Gambar dalam format base64
        NamaGambar: paketTur.NamaGambar,
        Kategori: paketTur.Kategori,
        KategoriSeason: paketTur.KategoriSeason,
        include: paketTur.include,
        exclude: paketTur.exclude,
        Kuota: paketTur.Kuota,
        MeetingPoint: paketTur.MeetingPoint,
        DestinasiList: paketTur.DetailPaketTurs.map(detail => ({
          DestinasiID: detail.Destinasi.DestinasiID,
          NamaDestinasi: detail.Destinasi.NamaDestinasi,
        }))
      };
      
      // console.log('Base64 Image:', base64Image);

      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'PaketTur tidak ditemukan' });
    }
  } catch (error) {
    console.error('Error fetching PaketTur:', error.message);
    res.status(500).json({
      message: 'Gagal mengambil data Paket Tur',
      error: error.message
    });
  }
};

// exports.updatePaketTur = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { PaketTurID } = req.params.PaketTurID;
//     const { NamaPaket, Deskripsi, HargaPaket, Durasi, Kategori, KategoriSeason, include, exclude, Kuota, MeetingPoint, DestinasiList } = req.body;

//     // Log data yang diterima
//     console.log('Received body:', req.body);

//     const adaPaket = await PaketTur.findOne({ where: { PaketTurID } });

//     if (!adaPaket) {
//       return res.status(400).json({ message: 'Data input tidak valid atau lengkap' });
//     }

//     // Update data Paket Tur
//     const [updated] = await PaketTur.update({
//       NamaPaket,
//       Deskripsi,
//       HargaPaket,
//       Durasi,
//       Kategori,
//       KategoriSeason,
//       include,
//       exclude,
//       Kuota,
//       MeetingPoint
//     }, {
//       where: { PaketTurID },
//       transaction
//     });

//     if (updated) {
//       // Hapus Detail Paket Tur yang lama
//       await DetailPaketTur.destroy({
//         where: { PaketTurID },
//         transaction
//       });

//       // Tambah Detail Paket Tur yang baru
//       const detailPaketTurPromises = DestinasiList.map(destinasiID =>
//         DetailPaketTur.create({
//           PaketTurID,
//           DestinasiID: destinasiID
//         }, { transaction })
//       );

//       await Promise.all(detailPaketTurPromises);

//       await transaction.commit();

//       const updatedPaketTur = await PaketTur.findByPk(paketTurID, {
//         include: [
//           {
//             model: DetailPaketTur,
//             include: [Destinasi]
//           }
//         ]
//       });
      
//       res.status(200).json(updatedPaketTur);
//     } else {
//       res.status(404).json({ error: 'PaketTur tidak ditemukan' });
//     }
//   } catch (error) {
//     await transaction.rollback();
//     console.error('Error updating PaketTur:', error.message);
//     res.status(500).json({
//       message: 'Gagal memperbarui Paket Tur',
//       error: error.message
//     });
//   }
// };

// exports.updatePaketTur = async (req, res) => {
//   const PaketTurID = req.params.PaketTurID;
//   const { NamaPaket, Deskripsi, HargaPaket, Durasi, Kategori, KategoriSeason, include, exclude, Kuota, MeetingPoint, DestinasiList } = req.body;

//   console.log('Received data:', req.body);

//   try {
//     if (!DestinasiList || !Array.isArray(DestinasiList)) {
//       throw new Error('DestinasiList tidak ditemukan atau bukan array');
//     }

//     const adaPaket = await PaketTur.findOne({ where: { PaketTurID } });

//     if (!adaPaket) {
//       return res.status(404).json({ error: 'PaketTur tidak ditemukan' });
//     }

//     const updated = await adaPaket.update({
//       NamaPaket,
//       Deskripsi,
//       HargaPaket,
//       Durasi,
//       Kategori,
//       KategoriSeason,
//       include,
//       exclude,
//       Kuota,
//       MeetingPoint
//     });

//     if (updated) {
//       await DetailPaketTur.destroy({
//         where: { PaketTurID }
//       });

//       const detailPaketTurPromises = DestinasiList.map(destinasiID =>
//         DetailPaketTur.create({
//           PaketTurID,
//           DestinasiID: destinasiID
//         })
//       );

//       await Promise.all(detailPaketTurPromises);

//       const updatedPaketTur = await PaketTur.findByPk(PaketTurID, {
//         include: [
//           {
//             model: DetailPaketTur,
//             include: [Destinasi]
//           }
//         ]
//       });

//       res.status(200).json(updatedPaketTur);
//     } else {
//       res.status(404).json({ error: 'PaketTur tidak ditemukan' });
//     }
//   } catch (error) {
//     console.error('Error updating PaketTur:', error.message);
//     res.status(500).json({
//       message: 'Gagal memperbarui Paket Tur',
//       error: error.message
//     });
//   }
// };

exports.updatePaketTur = async (req, res) => {
  const PaketTurID = req.params.PaketTurID;
  const { NamaPaket, Deskripsi, HargaPaket, Durasi, Kategori, KategoriSeason, include, exclude, Kuota, MeetingPoint, DestinasiList } = req.body;

  // Log data yang diterima
  console.log('Received data:', req.body);

  try {
    // Pastikan DestinasiList adalah array
    if (!Array.isArray(DestinasiList)) {
      throw new Error('DestinasiList tidak ditemukan atau bukan array');
    }

    const adaPaket = await PaketTur.findOne({ where: { PaketTurID } });

    if (!adaPaket) {
      return res.status(404).json({ error: 'PaketTur tidak ditemukan' });
    }

    const updated = await adaPaket.update({
      NamaPaket,
      Deskripsi,
      HargaPaket,
      Durasi,
      Kategori,
      KategoriSeason,
      include,
      exclude,
      Kuota,
      MeetingPoint
    });

    if (updated) {
      // Hapus DetailPaketTur lama
      await DetailPaketTur.destroy({ where: { PaketTurID } });

      // Tambahkan DetailPaketTur baru
      const detailPaketTurPromises = DestinasiList.map(destinasiID =>
        DetailPaketTur.create({ PaketTurID, DestinasiID: destinasiID })
      );
      await Promise.all(detailPaketTurPromises);

      // Ambil data PaketTur yang terupdate
      const updatedPaketTur = await PaketTur.findByPk(PaketTurID, {
        include: [{ model: DetailPaketTur, include: [Destinasi] }]
      });

      res.status(200).json(updatedPaketTur);
    } else {
      res.status(404).json({ error: 'PaketTur tidak ditemukan' });
    }
  } catch (error) {
    console.error('Error updating PaketTur:', error.message);
    res.status(500).json({
      message: 'Gagal memperbarui Paket Tur',
      error: error.message
    });
  }
};

// Fungsi untuk menghapus PaketTur berdasarkan ID
exports.deletePaketTur = async (req, res) => {
  const transaction = await sequelize.transaction(); // Memulai transaksi

  try {
    // Hapus Detail Paket Tur terkait
    await DetailPaketTur.destroy({
      where: { PaketTurID: req.params.id },
      transaction
    });

    // Hapus Paket Tur
    const deleted = await PaketTur.destroy({
      where: { PaketTurID: req.params.id },
      transaction
    });

    if (deleted) {
      // Commit transaksi
      await transaction.commit();
      res.status(204).send(); // Tidak ada konten untuk dikirim
    } else {
      res.status(404).json({ error: 'PaketTur tidak ditemukan' });
    }
  } catch (error) {
    // Rollback transaksi jika terjadi kesalahan
    await transaction.rollback();
    console.error('Error deleting PaketTur:', error.message);
    res.status(500).json({
      message: 'Gagal menghapus Paket Tur',
      error: error.message
    });
  }
};
