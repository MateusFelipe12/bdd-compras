const { MongoClient,  ObjectId} = require('mongodb');
console.log(process.env)

// Substitua 'sua_string_de_conexao' pela string de conexão real do seu banco de dados MongoDB
const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB');
        
        // Retorna a instância do banco de dados
        return client.db(); 
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
        throw err; // Rejeita a promessa em caso de erro
    }
}

module.exports = { connectToMongoDB , ObjectId};
