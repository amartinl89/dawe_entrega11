const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');
require('firebase/auth');
const Cliente = require('../models/cliente');


async function subirUsuario(nombre, apellido, email) {
  console.log('Subiendo usuario:', nombre, apellido, email);
  try{
    //return await Cliente.create({ nombre, apellido, email });
    const newCliente = new Cliente({ nombre, apellido, email });
    return await newCliente.save();
  }catch(error){
    console.error('Error al subir usuario:', error);
    return null;
  }
}

  //Exportar funciones
  module.exports = {
    subirUsuario
  };