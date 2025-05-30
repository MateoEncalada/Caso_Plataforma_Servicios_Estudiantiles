const axios = require('axios');

const academicApi = axios.create({
  baseURL: process.env.ACADEMIC_API_URL,
  timeout: 5000
});

async function validarEstudiante(cedula) {
  try {
    const resp = await academicApi.get(`/estudiantes/${cedula}`);
    return resp.data;
  } catch (err) {
    throw new Error(`Error validando estudiante: ${err.message}`);
  }
}

module.exports = { validarEstudiante };
