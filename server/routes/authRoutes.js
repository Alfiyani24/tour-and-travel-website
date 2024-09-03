const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute untuk CRUD operasi
router.get('/roles', authController.getRoles);
router.post('/create', authController.createUser); // Membuat pengguna baru
router.post('/login', authController.loginUser); // Login pengguna
router.get('/', authController.getAllUsers); // Mendapatkan semua pengguna
router.get('/:PelangganID', authController.getUserById); // Mendapatkan pengguna berdasarkan ID
router.put('/:PelangganID', authController.updateUser); // Memperbarui pengguna berdasarkan ID
router.delete('/:PelangganID', authController.deleteUser); // Menghapus pengguna berdasarkan ID

// Rute untuk mendapatkan daftar role
// Mendapatkan daftar role

module.exports = router;
