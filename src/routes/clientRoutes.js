const app = require('express').Router();
const clientsController = require("../controllers/clientController.js");


app.get('/', clientsController.getClients);
app.get('/client-by-id/:id', clientsController.getClientById);
app.get('/client-by-username/:username', clientsController.getClientByUsername);

module.exports = app;