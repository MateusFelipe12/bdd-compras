const buyService = require('../services/buyService');

const getBuy = async (req, res) => {
    try {
        const buys = await buyService.getBuy();
        res.status(200).send(buys);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getBuyById = async (req, res) => {
    try {
        const buy = await buyService.getBuyById(req.params);
        res.status(200).send(buy);
    } catch (error) {
        res.status(500).send(error);
    }
}

const persistBuy = async (req, res) => {
    try {
        const buy = await buyService.persistBuy(req.body);
        res.status(201).send(buy);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteBuy = async (req, res) => {
    try {
        const msg = await buyService.deleteBuy(req.params);
        res.status(200).send({ msg });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getBuy = getBuy;
module.exports.getBuyById = getBuyById;
module.exports.persistBuy = persistBuy;
module.exports.deleteBuy = deleteBuy;
