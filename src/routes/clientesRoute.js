const clientesController = require('../controllers/clientController');

module.exports = (app) => {
    app.get('/cliente', clientesController.getClients);
    app.get('/cliente/:id', clientesController.getClientById);
    app.post('/cliente', clientesController.persistClient);
    app.delete('/cliente/:id', clientesController.deleteClient);
}
