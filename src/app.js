require('dotenv').config();
const express        = require('express');
const bodyParser     = require('body-parser');
const jwtValidator   = require('./middlewares/jwtValidator');
const solicitudesRouter = require('./routes/solicitudes');

const app = express();
app.use(bodyParser.json());

// Healthcheck
app.get('/ping', (req, res) => res.send('pong'));

// Logging básico
app.use((req, res, next) => {
  console.log(`⇒ ${req.method} ${req.url}`);
  next();
});

// Validación global de JWT
app.use(jwtValidator);

// Montaje del router de solicitudes
app.use('/solicitudes', solicitudesRouter);

// Manejador de errores JWT
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Servicio escuchando en http://0.0.0.0:${PORT}`)
);

