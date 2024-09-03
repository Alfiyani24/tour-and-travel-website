const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware untuk memeriksa token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // Simpan informasi pengguna di request object
    req.userId = decoded.PelangganID;
    req.userRole = decoded.Role;
    next();
  });
};

// Middleware untuk memeriksa peran pengguna
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Middleware untuk memeriksa jika pengguna adalah staff
exports.isStaff = (req, res, next) => {
  if (req.userRole !== 'staff' && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
