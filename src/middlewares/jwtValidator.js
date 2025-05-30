// src/middlewares/jwtValidator.js
const { expressjwt: jwt } = require('express-jwt');

module.exports = jwt({
  // Clave secreta para firmar/verificar JWT (define JWT_SECRET en .env)
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
