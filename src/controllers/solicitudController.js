const {
  crearSolicitud,
  obtenerSolicitud
} = require('../services/solicitudService');

exports.createSolicitud = async (req, res) => {
  try {
    const result = await crearSolicitud(req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getSolicitud = async (req, res) => {
  try {
    const result = await obtenerSolicitud(req.params.id);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

