const CircuitBreaker = require('opossum');
const { _callRegistrarCertificacion } = require('./soapClient');
const { validarEstudiante } = require('./academicClient');

// Opciones del breaker
const breakerOptions = {
  timeout: 10000,               // 10s de timeout
  errorThresholdPercentage: 50, // abre si >50% de fallas
  resetTimeout: 10000,         // 5min hasta reintentar
  rollingCountTimeout: 60000,   // ventana de 60s
  rollingCountBuckets: 6        // subdividida en 6 buckets
};

// Creamos el breaker
const soapBreaker = new CircuitBreaker(_callRegistrarCertificacion, breakerOptions);

// Logging de eventos del breaker
soapBreaker.on('open',    () => console.warn('🔴 Breaker OPEN: no más llamadas al SOAP'));
soapBreaker.on('halfOpen',() => console.info('🟡 Breaker HALF-OPEN: probando llamadas'));
soapBreaker.on('close',   () => console.info('🟢 Breaker CLOSED: llamadas al SOAP habilitadas'));
soapBreaker.on('reject',  err => console.warn(`⚠️ Breaker REJECT: ${err.message}`));

async function crearSolicitud(data) {
  const { cedula, tipo, detalle } = data;

  // 1) Validar en REST académico
  await validarEstudiante(cedula);

  // 2) Registrar en SOAP con breaker + retry
  const soapArgs = { cedula, tipo, detalle };
  let result;
  const maxRetries = 2;
  let attempt = 0;

  while (true) {
    attempt++;
    try {
      result = await soapBreaker.fire(soapArgs);
      break;
    } catch (err) {
      if (attempt >= maxRetries) {
        throw new Error(`Error registrando SOAP (intentos: ${attempt}): ${err.message}`);
      }
      console.warn(`Retry #${attempt} al SOAP debido a: ${err.message}`);
    }
  }

  return {
    id: Math.random().toString(36).substring(2, 10),
    estado: result.status === 'OK' ? 'procesado' : 'rechazado'
  };
}

async function obtenerSolicitud(id) {
  return { id, estado: 'en revisión' };
}

module.exports = { crearSolicitud, obtenerSolicitud };
