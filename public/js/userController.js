// controllers/userController.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para mostrar la página de usuarios
router.get('/', (req, res) => {
  const user = req.session.user;

  if (user) {
    res.render('users', { email: user.email });
  } else {
    res.redirect('/');
  }
});

// Otras rutas para CRUD de usuarios usando MongoDB
// Ejemplo:
// router.post('/add', userController.addUser);
// router.post('/delete/:id', userController.deleteUser);
// router.post('/edit/:id', userController.editUser);

module.exports = router;
