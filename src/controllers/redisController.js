const redisService = require('../services/redisService');

const getData = async (req, res) => {
    try {
        const data = await redisService.getData();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getData = getData;
