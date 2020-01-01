var config = require('../config/config');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    var token = req.headers['access-token'];
    console.log(token);
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, config.keys.jwt, (err, decoded) =>{      
            if (err) {
                console.log(token);
                res.status(404).send('Connexion non autorisée');
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    } else {
        // if there is no token  
        console.log('no token');
        res.status(404).send('Connexion non autorisée');
    }
}