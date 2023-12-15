const personService = require('../services/personService');

const getPerson = async (req, res) => {
    try {
        const clientes = await personService.getPerson();
        res.status(200).send(clientes);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const getPersonById = async (req, res) => {
    try {
        const cliente = await personService.getPersonById(req.params);
        res.status(200).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistPerson = async (req, res) => {
    try {
        const cliente = await personService.persistPerson(req.body);
        res.status(201).send(cliente);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deletePerson = async (req, res) => {
    try {
        let msg = await personService.deletePerson(req.params);
        res.status(200).send({ msg });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getPerson = getPerson;
module.exports.getPersonById = getPersonById;
module.exports.persistPerson = persistPerson;
module.exports.deletePerson = deletePerson;
