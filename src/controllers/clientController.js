const clientesService = require('../services/clientService');

const pegarClientes = async (req, res) => {
    try{
        const clientes = await clientesService.pegarClientes();
        res.status(200).send(clientes);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const clientesId = async (req, res) => {
    try{
        const cliente = await clientesService.clientesId(req.params);
        res.status(200).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const postClientes = async (req, res) => {
    try{
        const cliente = await clientesService.postClientes(req.body);
        res.status(201).send(cliente);
    }   catch (erro) {
        res.status(500).send(erro);
    }
}

const patchCliente = async (req, res) => {
    try {
        const cliente = await clientesService.patchCliente(req.body);
        res.status(201).send(cliente);
    } catch (err) {
        res.status(500).send(err);
    }
}

const deleteCliente = async (req, res) => {
    try {
        let deletado = await clientesService.deleteCliente(req.params);
        let msg = deletado 
            ? `Cliente ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum cliente com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

const getClienteInfos = async (req, res) => {
    try{
        const cliente = await clientesService.getClienteInfos(req.params);
        res.status(200).send(cliente);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

module.exports.pegarClientes = pegarClientes;
module.exports.clientesId = clientesId;
module.exports.postClientes = postClientes;
module.exports.patchCliente = patchCliente;
module.exports.deleteCliente = deleteCliente;
module.exports.getClienteInfos = getClienteInfos;