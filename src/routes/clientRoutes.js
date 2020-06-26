const app = require('express').Router();
const clientsController = require("../controllers/clientController.js");
const middleware = require("../controllers/authController");

app.get('/', middleware.ensureAuthenticated, clientsController.getClients);
app.get('/by-id/:id', middleware.ensureAuthenticated, clientsController.getClientById);
app.get('/by-username/:username', middleware.ensureAuthenticated, clientsController.getClientByUsername);

module.exports = app;