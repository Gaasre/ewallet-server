var express = require('express'),
    router = express.Router(),
    sequelize = require('../models').sequelize

router.get('/', function (req, res) {
    sequelize.query(`SELECT T.*, U.username as seller_username, U.phone as seller_phone 
    FROM transactions T 
    JOIN users U ON T.buyerid=U.id
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