const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');

require('firebase/auth');
// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '../email-password.html'));
  res.redirect('/email-password.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
// Conexión a la base de datos MongoDB
// mongoose.connect('mongodb://localhost/myapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

// Importar el enrutador de usuarios
//const usersRouter = require('./users');

// Usar el enrutador de usuarios en la aplicación
// app.use('/users', usersRouter);

// // Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor iniciado en puerto ${PORT}`);
// });
