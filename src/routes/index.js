
const clientes = require('./clientesRoute');
const buy = require('./buyRoute');

module.exports = (app) => {
    clientes(app);
    buy(app);
}