const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const models = require('./models'); // Memuat model dan asosiasi
// const multer = require('multer');

// const upload = multer({
//   limits: {
//     fileSize: 10 * 1024 * 1024 // Batas ukuran file 10MB
//   }
// });

dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' })); // Atur batas ukuran sesuai kebutuhan
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(upload.array()); // Untuk multipart/form-data

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json({ limit: '10mb' })); // Atur batas ukuran sesuai kebutuhan
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Ensure routes are properly imported
const authRoutes = require('./routes/authRoutes');
const paketTurRoutes = require('./routes/paketTurRoutes');
const destinasiRoutes = require('./routes/destinasiRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const detailPaketTurRoutes = require('./routes/detailPaketTurRoutes');
// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/pakettur', paketTurRoutes);
app.use('/api/destinasi', destinasiRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/detailpakettur', detailPaketTurRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
