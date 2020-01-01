var express = require('express'),
    router = express.Router(),
    config = require('../config/config'),
    User = require('../models').user,
    sequelize = require('../models').sequelize,
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs')

router.post('/', function (req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    sequelize.sync().then(function () {
        return User.create({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phone: req.body.phone
        });
    }).then(function (created) {
        var user = created.get({
            plain: true
        })
        if (created) {
            var token = jwt.sign({
                id: user.id,
            }, config.keys.jwt, {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            })
            res.status(200).json({
                id: user.id,
                token: token,
                username: user.username,
                phone: user.phone,
                email: user.email,
                balance: user.balance
            });
        } else {
            res.status(404).send('Cannot create the user');
        }
    });
});

module.exports = router