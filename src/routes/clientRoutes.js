const app = require('express').Router();
const clientsController = require("../controllers/clientController.js");
const middleware = require("../controllers/authController");

app.get('/', middleware.ensureAuthenticated ,clientsController.getClients);
app.get('/client-by-id/:id', clientsController.getClientById);
app.get('/client-by-username/:username', clientsController.getClientByUsername);

module.exports = app;