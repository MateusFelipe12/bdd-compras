const clientesService = require('../services/clientService');

const getClients = async (req, res) => {
    try {
        const clientes = await clientesService.getClients();
        res.status(200).send(clientes);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const getClientById = async (req, res) => {
    try {
        const cliente = await clientesService.getClientById(req.params);
        res.status(200).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistClient = async (req, res) => {
    try {
        const cliente = await clientesService.persistClient(req.body);
        res.status(201).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deleteClient = async (req, res) => {
    try {
        let msg = await clientesService.deleteClient(req.params);
        res.status(200).send({ msg });
    } catch (err) {
        res.status(500).send(err);
    }
}

const getClienteInfos = async (req, res) => {
    try {
        const cliente = await clientesService.getClienteInfos(req.params);
        res.status(200).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

module.exports.getClients = getClients;
module.exports.getClientById = getClientById;
module.exports.persistClient = persistClient;
module.exports.deleteClient = deleteClient;
module.exports.getClienteInfos = getClienteInfos;
