var express = require('express'),
    router = express.Router(),
    sequelize = require('../models').sequelize

router.get('/', function (req, res) {
    sequelize.query(`SELECT T.*, U.username as seller_username, U.phone as seller_phone 
    FROM transactions T 
    JOIN users U ON T.sellerid=U.id OR T.buyerid=U.id OR U.id=T.sellerid OR U.id=T.buyerid
    WHERE T.buyerid=?;`, {
        replacements: [req.user.id],
        type: sequelize.QueryTypes.SELECT
    }).then(function (_transactions) {
        res.status(200).json({
            result: 'success',
            data: _transactions
        });
    });
});

module.exports = router