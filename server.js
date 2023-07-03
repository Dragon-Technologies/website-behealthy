const express = require('express');
const path = require('path');
const mailgun = require('mailgun-js');

const app = express();

// Define o diretório onde o arquivo HTML está localizado
const publicDirectoryPath = path.join(__dirname, 'public');

// Configura o Express para servir os arquivos estáticos
app.use(express.static(publicDirectoryPath));

// Adiciona o middleware para o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura as credenciais do Mailgun
const mg = mailgun({
  apiKey: '5b5ce321fd9fd6e8e1bd8e3b2577c834-e5475b88-c3206da3',
  domain: 'sandbox4800335e7efc4c628ec3690f46e3a99c.mailgun.org',
});

app.post('/sendmail', (req, res) => {
  // Verifica se os campos foram preenchidos
  if (req.body.name && req.body.surname && req.body.email && req.body.message && req.body.company) {
    // Cria o conteúdo do email
    const data = {
      from: 'faleconosco@behealthy-ict.org',
      to: 'faleconosco@behealthy-ict.org',
      subject: 'Novo formulário de contato',
      html: `
        <h2>Novo formulário de contato</h2>
        <p><strong>Nome:</strong> ${req.body.name}</p>
        <p><strong>Sobrenome:</strong> ${req.body.surname}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Telefone:</strong> ${req.body.phone}</p>
        <p><strong>Empresa:</strong> ${req.body.company}</p>
        <p><strong>Mensagem:</strong> ${req.body.message}</p>
      `,
    };

    // Envia o email
    mg.messages().send(data, (error, body) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocorreu um erro ao enviar o email.' });
      } else {
        console.log('Email enviado:', body);
        res.status(200).json({ message: 'Email enviado com sucesso!' });
      }
    });
  } else {
    res.status(400).json({ error: 'Verifique se todos os campos obrigatórios foram preenchidos corretamente.' });
  }
});

// Define a rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'default.html'));
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
