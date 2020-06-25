const app = require('express').Router();
const auth = require("../controllers/authController.js");


app.post('/login', auth.login);

module.exports = app;