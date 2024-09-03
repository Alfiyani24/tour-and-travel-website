const Pelanggan = require('../models/Pelanggan');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const generatePelangganID = require('../utils/generatePelangganID');

// Endpoint untuk mendapatkan daftar role
exports.getRoles = async (req, res) => {
  try {
    const roles = ['customer', 'staff', 'tour guide'];
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { NamaLengkap, Email, Telepon, PASSWORD, Role } = req.body;

    // Generate a new PelangganID
    const newPelangganID = await generatePelangganID();

    // Set Role to 'customer' if not provided
    const userRole = Role || 'customer';

    // Hash the password
    const hashedPassword = await bcrypt.hash(PASSWORD, config.bcryptSaltRounds);

    // Create a new user
    const newUser = await Pelanggan.create({
      PelangganID: newPelangganID,
      NamaLengkap,
      Email,
      Telepon,
      PASSWORD: hashedPassword,
      Role: userRole
    });

    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { Email, PASSWORD } = req.body;
    const user = await Pelanggan.findOne({ where: { Email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { Email: user.Email, Role: user.Role } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Pelanggan.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { PelangganID } = req.params;
    const user = await Pelanggan.findByPk(PelangganID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { PelangganID } = req.params;
    const { NamaLengkap, Telepon, PASSWORD, Role } = req.body;

    const user = await Pelanggan.findByPk(PelangganID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (NamaLengkap) user.NamaLengkap = NamaLengkap;
    if (Telepon) user.Telepon = Telepon;
    if (PASSWORD) {
      user.PASSWORD = await bcrypt.hash(PASSWORD, config.bcryptSaltRounds);
    }
    if (Role) user.Role = Role;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { PelangganID } = req.params;
    const user = await Pelanggan.findByPk(PelangganID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
