// Middleware untuk menangani kesalahan
exports.errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    // Menentukan respons yang dikirim berdasarkan jenis kesalahan
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Kesalahan umum lainnya
    res.status(500).json({ message: 'Internal server error' });
  };
  