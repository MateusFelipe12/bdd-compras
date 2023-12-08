const buyController = require('../controllers/buyController');

module.exports = (app) => {
    app.get('/buy', buyController.getBuy);
    app.get('/buy/:id', buyController.getBuyById);
    app.post('/buy', buyController.persistBuy);
    app.delete('/buy/:codigo', buyController.deleteBuy);
}
