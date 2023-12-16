
const clientes = require('./clientesRoute');
const buy = require('./buyRoute');
const person = require('./personRoute');
const redis = require('./redisRoute');

module.exports = (app) => {
    clientes(app);
    buy(app);
    person(app);
    redis(app);
}