// src/controllers/solicitudController.js

// Por ahora mocks sencillos, luego añadiremos lógica real
exports.createSolicitud = async (req, res) => {
  // Aquí se orquesta: academicClient, soapClient, etc.
  return res.status(201).json({ id: '1234', estado: 'procesado' });
};

exports.getSolicitud = async (req, res) => {
  const { id } = req.params;
  // Consulta de estado (mock)
  return res.json({ id, estado: 'en revisión' });
};
