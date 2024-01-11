const express = require('express');
const cors = require('cors');

const app = express();

// Usar o middleware cors para aceitar requisições de qualquer origem
app.use(cors());

app.use(express.json());

// Middleware
require('./routes/index')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(process.env)

    console.log(`Servidor rodando na porta ${PORT}`);
});
