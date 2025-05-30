const { soap } = require('strong-soap');
const url = process.env.SOAP_WSDL_URL;

function _callRegistrarCertificacion(args) {
  return new Promise((resolve, reject) => {
    soap.createClient(url, {}, (err, client) => {
      if (err) return reject(err);
      client.RegisterCertificate(args, (errSoap, result) => {
        if (errSoap) return reject(errSoap);
        resolve(result);
      });
    });
  });
}

module.exports = { _callRegistrarCertificacion };
