const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Crear un modelo de usuario basado en el esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
