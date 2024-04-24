
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');
const MongoStore = require('connect-mongo');
require('firebase/auth');
// Configurar la carpeta pública
session = require('express-session');
const Client = require('./public/models/cliente'); // Importar el modelo de cliente

const mongojs = require('mongojs');
const db = mongojs('clientSchema', ['Cliente']);


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

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // especifica que motor de plantillas usar, en nuestro caso EJS
app.set('views', 'views'); // indica que las plantillas estan en la carpeta “views” (segundo argumento)

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '../email-password.html'));
   if (req.session.email) {
     // Si hay una sesión iniciada, redirigir a /user
      res.redirect('/user');
   } else {
    // Si no hay sesión iniciada, redirigir a /email-password.html
    return res.redirect('/email-password.html');
  }
});

// app.get('/user', (req, res) => {
//   db.Client.find((err, datos) => {
//     if(err) {
//       res.send("Error");
//    } else {
//     return res.render('user', { email: req.session.email, clients: datos
//       });
//   }});
// });

app.get('/user', async (req, res) => {
  try {
    // Consultar todos los clientes desde la base de datos
    const clients = await  Client.find().lean;
    // db.clientSchema.find((err, clients) => {
    //   if(err) {
    //       res.send("Error");
    //   } else {
    //       res.send(clients);
    //  }
    //  });

    // Si se encontraron clientes, renderizar la vista con los clientes encontrados
    res.render('user', { email: req.session.email, clients: clients });
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
