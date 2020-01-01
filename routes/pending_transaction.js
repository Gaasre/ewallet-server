var express = require('express'),
    router = express.Router(),
    sequelize = require('../models').sequelize,
    Pending = require('../models').pending_transaction,
    Transaction = require('../models').transaction

router.post('/', function (req, res) {
    sequelize.sync().then(function () {
        return Pending.create({
            sellerid: req.user.id,
            price: req.body.price
        });
    }).then(function (_pending) {
        res.status(200).json({
            response: 'success',
            data: _pending
        });
    });
});

router.get('/:id', function (req, res) {
    const { id } = req.params;
    sequelize.sync().then(function () {
        return Pending.findOne({
            where: {
                sellerid: req.user.id,
                id: id
            }
        });
    }).then(function (_pending) {
        if (_pending) {
            res.status(200).json({
                response: 'success',
                data: ''
            });
        } else {
            res.status(200).json({
                response: 'fail',
                data: ''
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    const { id } = req.params;
    sequelize.sync().then(function () {
        return Pending.findOne({
            where: {
              id: id
            }
          });
    }).then(function (_pending) {
        sequelize.sync().then(function () {
            return Pending.destroy({
                where: {
                  id: id
                }
              });
        }).then(function (_p) {
            if (_p) {
                sequelize.sync().then(function () {
                    return Transaction.create({
                        sellerid: _pending.sellerid,
                        buyerid: req.user.id,
                        price: _pending.price
                      });
                }).then(function (_transaction) {
                    res.status(200).json({
                        response: 'success',
                        data: _transaction
                    });
                });
            } else {
                res.status(200).json({
                    response: 'fail',
                    data: ''
                });
            }
        });
    });
    
});

module.exports = router