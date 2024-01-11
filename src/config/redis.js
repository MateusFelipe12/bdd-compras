var redis = require('redis');

const client = redis.createClient({
    // exemplo usando login e senha
    // url: 'redis://alice:foobared@redis:6379'
    url: process.env.REDIS_CONN
});
  
client.on('error', err => console.log('Redis Client Error', err));

client.connect();

async function setData(chave, dados) {
    try {
        if (typeof dados === 'object') {
            dados = JSON.stringify(dados);
        }
        let data = await client.set(chave + '', dados);
        return data;
    } catch (err) {
        console.log(err)
    }
}


async function getData(chave) {
    try {
        return await client.get(chave);
    } catch (err) {
        console.log(err)
    }
}

module.exports = { setData, getData, client};












