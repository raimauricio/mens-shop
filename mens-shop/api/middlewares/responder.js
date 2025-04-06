const fs = require('fs');
const path = require('path');

// 🧩 Comparador
const matchField = (incomingValue, expectedValue) => {
  if (typeof expectedValue === 'object' && !Array.isArray(expectedValue)) {
    if (expectedValue.equals !== undefined) return incomingValue == expectedValue.equals;
    if (expectedValue.startsWith !== undefined) return typeof incomingValue === 'string' && incomingValue.startsWith(expectedValue.startsWith);
    if (expectedValue.includes !== undefined) return typeof incomingValue === 'string' && incomingValue.includes(expectedValue.includes);
    if (expectedValue.regex !== undefined) return new RegExp(expectedValue.regex).test(incomingValue);
  }

  if (Array.isArray(expectedValue)) {
    if (Array.isArray(incomingValue)) {
      return expectedValue.some(v => incomingValue.includes(v));
    } else {
      return expectedValue.includes(incomingValue);
    }
  }

  return incomingValue == expectedValue;
};

const matchArrayConditions = (incoming = {}, expectedArray = []) => {
  return expectedArray.every(({ key, value }) => {
    const incomingVal = incoming[key] ?? incoming[key.toLowerCase()];
    return matchField(incomingVal, value);
  });
};

const matchObjectConditions = (incoming = {}, expected = {}) => {
  return Object.entries(expected).every(([key, val]) => {
    return matchField(incoming[key], val);
  });
};

// 🎯 Novo middleware com validação por método como subpasta
const responder = (endpointFolder) => {
  return (req, res) => {
    const method = req.method.toUpperCase(); // GET, POST etc.
    const dirPath = path.join(__dirname, '../endpoints', endpointFolder, method);

    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error('❌ Erro lendo diretório de mocks:', dirPath);
        return res.status(500).send('Erro no mock');
      }

      for (const file of files) {
        const filePath = path.join(dirPath, file);

        try {
          const mock = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const reqMock = mock.request || {};

          const headersMatch = matchArrayConditions(req.headers, reqMock.headers || []);
          const queryMatch = matchArrayConditions(req.query, reqMock.query || []);
          const paramsMatch = matchObjectConditions(req.params, reqMock.params || {});
          const bodyMatch = matchObjectConditions(req.body, reqMock.body || {});

          if (headersMatch && queryMatch && paramsMatch && bodyMatch) {
            console.log(`✅ Mock aplicado: ${file}`);
            const response = mock.response || {};
            return res.status(response.status || 200).json(response.data || {});
          }

        } catch (e) {
          console.warn(`⚠️ Erro lendo/parsing mock ${file}:`, e);
          continue;
        }
      }

      return res.status(404).send('Nenhum mock correspondente encontrado');
    });
  };
};



module.exports = responder;
