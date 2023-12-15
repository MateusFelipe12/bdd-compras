
const clientes = require('./clientesRoute');
const buy = require('./buyRoute');
const person = require('./personRoute');

module.exports = (app) => {
    clientes(app);
    buy(app);
    person(app)
}