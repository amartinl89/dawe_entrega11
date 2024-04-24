
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');
const MongoStore = require('connect-mongo');
require('firebase/auth');
// Configurar la carpeta pública
session = require('express-session');

app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://0.0.0.0:27017/dawe' }),
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '../email-password.html'));
  // if (req.session.email) {
  //   // Si hay una sesión iniciada, redirigir a /user
  //   return res.redirect('/user');
  // } else {
    // Si no hay sesión iniciada, redirigir a /email-password.html
    return res.redirect('/email-password.html');
  }
);

app.get('/user', (req, res) => {
  req.session.auth = true; // Iniciar sesión
  res.redirect('/user');
});

app.get('/login',(req,res) => {
  const { email, password } = req.query;
  req.session.email = email;
  app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/dawe'})
    }));

  res.end('done');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
const Client = require('./public/models/user'); // Importar el modelo de cliente
const exp = require('constants');

// Ruta para agregar un nuevo cliente
app.post('/clients/add', (req, res) => {
  const { nombre, apellido, email } = req.body;

  // Crear un nuevo cliente con los datos recibidos
  const newClient = new Client({ nombre, apellido, email });

  // Guardar el nuevo cliente en la base de datos
  newClient.save()
    .then(() => {
      console.log('Cliente agregado exitosamente');
      res.redirect('/user'); // Redirigir al usuario después de agregar el cliente
    })
    .catch((err) => {
      console.error('Error al agregar cliente:', err);
      res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error al cliente
    });
});

// Ruta para eliminar un cliente
app.get('/clients/delete/:id', (req, res) => {
  const { id } = req.params;
  Client.findByIdAndDelete(id)
    .then(() => res.redirect('/user'))
    .catch((err) => console.log(err));
});

// Ruta para editar un cliente
app.post('/clients/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Client.findByIdAndUpdate(id, { name })
    .then(() => res.redirect('/user'))
    .catch((err) => console.log(err));
});
