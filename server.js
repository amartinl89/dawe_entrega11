const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

// Importar el enrutador de usuarios
const usersRouter = require('./users');

// Usar el enrutador de usuarios en la aplicación
app.use('/users', usersRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
