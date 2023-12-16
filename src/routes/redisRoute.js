const redisController = require('../controllers/redisController');

module.exports = (app) => {
    app.get('/getData', redisController.getData);
}
