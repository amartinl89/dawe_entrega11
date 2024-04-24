
const mongoose = require('mongoose');

// Definir el esquema de usuario
const clientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  }
});

// Crear un modelo de usuario basado en el esquema
const Cliente = mongoose.model('Cliente', clientSchema);

module.exports = Cliente;
