const redis = require('redis');

// Crie um cliente Redis
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Manipuladores de eventos para lidar com erros, por exemplo
client.on('error', (err) => {
    console.error(`Erro de conexão com o Redis: ${err}`);
});

// Exemplo de autenticação (se o seu servidor Redis requer autenticação)
// client.auth('sua_senha_redis', (err) => {
//   if (err) throw err;
//   console.log('Autenticado no Redis');
// });


function setData(chave, dados) {
    // Converta os dados para uma string JSON antes de armazenar
    const dadosString = JSON.stringify(dados);

    // Armazene os dados no Redis com a chave fornecida
    client.set(chave, dadosString, (err, reply) => {
        if (err) {
            console.error(`Erro ao definir dados no Redis: ${err}`);
        } else {
            console.log(`Dados definidos no Redis. Resposta: ${reply}`);
        }
    });
}

module.exports = { setData };

