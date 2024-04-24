const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');
require('firebase/auth');
const User = require('../models/cliente');

async function subirUsuario(nombre, apellido, email) {
    const nuevoUsuario = new User({ nombre, apellido, email });
    return await nuevoUsuario.save();
  }
