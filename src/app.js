// src/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const jwtValidator      = require('./middlewares/jwtValidator');
const solicitudesRouter = require('./routes/solicitudes');

const app = express();
app.use(bodyParser.json());

// --- DEBUG: ruta ping para comprobar que el servidor funciona ---
app.get('/ping', (req, res) => res.send('pong'));

// Logging de cada request
app.use((req, res, next) => {
  console.log(`⇒ ${req.method} ${req.url}`);
  next();
});

// Validación global de JWT
app.use(jwtValidator);

// Montaje de tu router
app.use('/solicitudes', solicitudesRouter);

// Manejador básico de errores JWT
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servicio escuchando en http://localhost:${PORT}`)
);
