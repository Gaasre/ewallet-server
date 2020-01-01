var config = require('../config/config');
var Sequelize = require('sequelize');
var db = {}

var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});
db.pending_transaction = require('./pending_transactions')(sequelize, Sequelize);
db.transaction = require('./transactions')(sequelize, Sequelize);
db.user = require('./users')(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;