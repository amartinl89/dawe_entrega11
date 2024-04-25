
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('firebase/auth');
const { subirUsuario, eliminarCliente, seleccionarCliente, editarCliente } = require('./public/js/controladorCliente') //Añadir aquí las funciones que se exportaron desde main.js
// Configurar la carpeta pública
session = require('express-session');
const Client = require('./public/models/cliente'); // Importar el modelo de cliente
// Configurar body-parser para analizar las solicitudes con cuerpo en formato JSON
app.use(bodyParser.json());

// Configurar body-parser para analizar las solicitudes con cuerpo en formato URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/dawe11' }),
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}));

app.use(express.static(path.join(__dirname, 'public'), {
  // Función para establecer los encabezados HTTP de acuerdo al tipo de archivo
  setHeaders: (res, filePath) => {
    const contentTypeMap = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.ejs': 'text/ejs'
    };

    const contentType = contentTypeMap[path.extname(filePath).toLowerCase()];
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
  }
}));
app.set('view engine', 'ejs'); // especifica que motor de plantillas usar, en nuestro caso EJS
app.set('views', 'views'); // indica que las plantillas estan en la carpeta “views” (segundo argumento)

const mongoUrl = 'mongodb://127.0.0.1:27017/dawe11';
mongoose.connect(
  mongoUrl, // Utiliza la URL de conexión de la variable de entorno
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.get('/', (req, res) => {
   if (req.session.email) {
     // Si hay una sesión iniciada, redirigir a /user
      res.redirect('/user');
   } else {
    // Si no hay sesión iniciada, redirigir a /email-password.html
    return res.redirect('/email-password.html');
  }
});

app.get('/user', async (req, res) => {
  try {
    // Consultar todos los clientes desde la base de datos
    if (!req.session.email) {
      return res.send('Inicie sesión para primero');
    }
    const clients = await  Client.find();
    const { clienteEditarNombre, clienteEditarApellido, clienteEditarEmail, clienteEditarId } = req.query;
    // Si se encontraron clientes, renderizar la vista con los clientes encontrados
    res.render('user', { email: req.session.email, clients: clients, clienteEditarNombre: clienteEditarNombre,
    clienteEditarApellido: clienteEditarApellido, clienteEditarEmail: clienteEditarEmail, clienteEditarId: clienteEditarId});
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return res.status(500).send('Error interno del servidor');
  }
});
 

app.get('/login',(req,res) => {
  const { email} = req.query;
  req.session.auth = true; // Iniciar sesión
  req.session.email = email;
  session
  app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/dawe'})
    }));

  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

// Ruta para agregar un nuevo cliente
app.post('/user/add', async (req, res) => {
  const { nombre, apellido, email } = req.body;
  // Guardar el nuevo cliente en la base de datos
  if(nombre == '' || apellido == '' || email == ''){
    console.log('Faltan datos');
    res.redirect('/user');
  }
  let newUser = subirUsuario(nombre, apellido, email)
    try{
      console.log('Cliente añadido correctamente'. newUser);
      res.redirect('/user'); // Redirigir al usuario después de agregar el cliente
    }
    catch(err){
      console.error('Error al añadir cliente:', err);
      res.status(500).send('Error interno del servidor'); // Enviar una respuesta de error al cliente
    }
  });

// Ruta para eliminar un cliente
app.post('/user/delete', (req, res) => {
  const { id } = req.body;
  try{
    eliminarCliente(id);
    res.redirect('/user');
  }catch(error){
    console.error('Error al eliminar cliente:', error);
    res.status(500).send('Error interno del servidor');
}
});

// Ruta para editar un cliente
app.post('/user/edit', (req, res) => {
  const { id, nombre, apellido, email } = req.body;
  try{
    editarCliente(nombre, apellido, email, id);
    res.redirect('/user');
  }catch(error){
    console.error('Error al eliminar cliente:', error);
    res.status(500).send('Error interno del servidor');
}
});


app.post('/user/select', async (req, res) => {
  const { id } = req.body;
  try{
  let clienteEditar = await seleccionarCliente(id)
  console.log('Cliente seleccionado:', clienteEditar);
  const clients = await  Client.find();
  //res.render('user', { email: "prueba", clients: clients, clienteEditar: clienteEditar});
  const redirectUrl = `/user?clienteEditarNombre=${clienteEditar.nombre}&clienteEditarApellido=${clienteEditar.apellido}&clienteEditarEmail=${clienteEditar.email}&clienteEditarId=${clienteEditar._id}`;
  res.redirect(redirectUrl);
  }catch(error){
    console.error('Error al seleccionar cliente:', error);
    res.status(500).send('Error interno del servidor');
  }
  });
