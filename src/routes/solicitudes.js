// src/routes/solicitudes.js
const express = require('express');
const router = express.Router();
const { createSolicitud, getSolicitud } = require('../controllers/solicitudController');

// POST /solicitudes
router.post('/', createSolicitud);

// GET /solicitudes/:id
router.get('/:id', getSolicitud);

module.exports = router;
