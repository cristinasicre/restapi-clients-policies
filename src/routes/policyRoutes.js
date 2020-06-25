const app = require('express').Router();
const policiesController = require("../controllers/policyController.js");
const policyController = require('../controllers/policyController.js');


app.get('/', policiesController.getPolicies);
app.get('/policies-by-user/:clientId', policyController.getPoliciesByClientId);

module.exports = app;