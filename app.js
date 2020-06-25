const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { CLIENTS_URL } = require('./src/properties/application.properties');

var app = express();

//Settings
app.set('port', 3001);

app.use(bodyParser.urlencoded({
    extended: false
    }));
    app.use(bodyParser.json());

    
//Routes
const authRoutes = require('./src/routes/authRoutes');
const clientsRoutes = require('./src/routes/clientRoutes');
const policiesRoutes = require('./src/routes/policyRoutes');

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE');
    
    next();
});

app.use('/auth', authRoutes);
app.use('/clients', clientsRoutes);
app.use('/policies', policiesRoutes);


module.exports = app;