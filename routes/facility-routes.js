module.exports = (app) => {
    
    const facilities = require('../controllers/facility-controller.js');

    app.post('/v1/facilities', facilities.create);

    app.get('/v1/facilities', facilities.findAll);

    app.get('/v1/facilities/:facilityId', facilities.findOne);

    app.put('/v1/facilities/:facilityId', facilities.update);

    app.delete('/v1/facilities/:facilityId', facilities.delete);

}