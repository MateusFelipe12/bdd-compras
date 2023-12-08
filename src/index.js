//PRIMEIRO PASSO É IMPORTAR A DEPENDENCIA DO EXPRESS PARA A CRIACAO DO SERVIDOR
const express = require ('express');

//CRIAR UMA CONST QUE REPRESENTA NOSSA APLICACAO COMO UM TODO
//VAMOS CHAMALA DE "app" E ELA RECEBE A INVOCACAODO EXPRESS
const app = express();

app.use(express.json());

//MIDDLEWARE
require('./routes/index')(app);

//DEFINE-SE EM QUAL PORTA A APLICACAO VAI RODAR, PARA ISSO USAMOS A FUNCAO
// .listen(PORT, CALLBACK FUNCTION)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});