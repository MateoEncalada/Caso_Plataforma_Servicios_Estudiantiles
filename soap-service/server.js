// soap-service/server.js
const express    = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');
const soap       = require('soap');

const app  = express();
const port = 5000;

// Necesario para que el body del SOAP no sea interpretado como JSON
app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

// Define la implementación del servicio tal como en el WSDL
const serviceImpl = {
  CertificationService: {
    CertificationPort: {
      RegisterCertificate(args) {
        console.log('SOAP → RegisterCertificate args:', args);
        // Aquí podrías añadir lógica real (persistir, validar, etc.)
        return { status: 'OK' };
      }
    }
  }
};

// Carga el WSDL
const wsdlXml = fs.readFileSync(__dirname + '/CertificationService.wsdl', 'utf8');

// Monta el endpoint SOAP en /CertificationService
app.listen(port, () => {
  soap.listen(app, '/CertificationService', serviceImpl, wsdlXml);
  console.log(`✅ SOAP Service escuchando en http://localhost:${port}/CertificationService?wsdl`);
});
