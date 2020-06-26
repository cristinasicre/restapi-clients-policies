const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Settings
app.set('port', 3001);


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