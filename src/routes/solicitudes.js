const express = require('express');
const {
  createSolicitud,
  getSolicitud
} = require('../controllers/solicitudController');

const router = express.Router();

router.post('/', createSolicitud);
router.get('/:id', getSolicitud);

module.exports = router;

