var express = require('express'),
    router = express.Router(),
    config = require('../config/config'),
    User = require('../models').user,
    sequelize = require('../models').sequelize,
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs')

router.post('/', function (req, res) {
    console.log(req.body);
    sequelize.sync().then(function () {
        return User.findOne({
            where: {
                username: req.body.username,
            }
        });
    }).then(function (_user) {
        if (_user) {
            var user = _user.get({
                plain: true
            });

            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign({
                    id: user.id,
                }, config.keys.jwt, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })
                res.status(200).json({
                    response: 'success',
                    data: {
                        id: user.id,
                        token: token,
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        balance: user.balance
                    }
                });
            } else {
                res.status(200).send({
                    response: 'fail',
                    data: 'Identifiants incorrects'
                });
            }
        } else {
            res.status(200).send({
                response: 'fail',
                data: 'Utilisateur introuvable'
            });
        }
    });
});



module.exports = router