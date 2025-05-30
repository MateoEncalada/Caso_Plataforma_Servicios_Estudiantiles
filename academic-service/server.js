// academic-service/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

// Simula GET /api/estudiantes/:cedula
app.get('/api/estudiantes/:cedula', (req, res) => {
  const { cedula } = req.params;
  // Retorna datos simulados del estudiante
  res.json({
    cedula,
    nombre: 'Juan Pérez',
    carrera: 'Ingeniería de Software'
  });
});

app.listen(port, () =>
  console.log(`📚 Academic Service escuchando en http://localhost:${port}/api/estudiantes/:cedula`)
);