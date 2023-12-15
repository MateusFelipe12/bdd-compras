const personController = require('../controllers/personController');

module.exports = (app) => {
    app.get('/pessoa', personController.getPerson);
    app.get('/pessoa/:id', personController.getPersonById);
    app.post('/pessoa', personController.persistPerson);
    app.delete('/pessoa/:id', personController.deletePerson);
}
