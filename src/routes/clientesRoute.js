const clientesController = require('../controllers/clientController');

module.exports = (app) => {
    app.get('/cliente', clientesController.pegarClientes);
    app.get('/cliente/informacoes/:id', clientesController.getClienteInfos);
    app.get('/cliente/:id', clientesController.clientesId);
    app.post('/cliente/novo', clientesController.postClientes);
    app.patch('/cliente', clientesController.patchCliente);
    app.delete('/cliente/:id', clientesController.deleteCliente);
}