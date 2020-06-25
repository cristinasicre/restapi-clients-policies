const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../properties/application.properties');

function login(req, res) {

    const username = req.body.username;

    jwt.sign({ username }, JWT_SECRET, {expiresIn: '30s'}, (err, token) => {
        res.status(200).send({Bearer:token});
    });
}


function ensureAuthenticated(req, res, next){
    const token = req.headers['authorization'].split(" ")[1];
    
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
}



module.exports = {
    login,
    ensureAuthenticated
}