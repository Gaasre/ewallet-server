var express = require('express'),
    router = express.Router(),
    User = require('../models').user,
    sequelize = require('../models').sequelize

router.get('/', function (req, res) {
    console.log(req.user.id);
    sequelize.sync().then(function () {
        return User.findOne({
            where: {
                id: req.user.id,
            },
            attributes: {
                exclude: ['password']
            }
        });
    }).then(function (_user) {
        if (_user) {
            var user = _user.get({
                plain: true
            });
            res.status(200).json({
                response: 'success',
                data: user
            });
        } else {
            res.status(200).send({
                response: 'fail',
                data: 'Utilisateur introuvable'
            });
        }
    });
});



module.exports = router