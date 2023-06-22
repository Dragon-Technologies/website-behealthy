const express = require('express');
const path = require('path');

const app = express();

// Define o diretório onde o arquivo HTML está localizado
const publicDirectoryPath = path.join(__dirname, 'public');

// Configura o Express para servir os arquivos estáticos
app.use(express.static(publicDirectoryPath));

// Define a rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'default.html'));
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
