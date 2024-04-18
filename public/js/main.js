const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
const path = require('path');

require('firebase/auth');

// Configuración de Firebase
const firebaseConfig = {
  // Tu configuración de Firebase aquí
};

firebase.initializeApp(firebaseConfig);

// Configurar bodyParser para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para enviar el archivo email-password.html desde /public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../email-password.html'));
});

// Ruta para manejar la solicitud de inicio de sesión (POST)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Autenticación exitosa
      res.send('Inicio de sesión exitoso');
    })
    .catch((error) => {
      // Error de autenticación
      res.status(401).send('Error de autenticación: ' + error.message);
    });
});

// Escuchar en un puerto específico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
