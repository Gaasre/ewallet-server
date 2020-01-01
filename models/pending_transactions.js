module.exports = (sequelize, DataTypes) => {

    const pending_transactions = sequelize.define('pending_transactions', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        sellerid: { type: DataTypes.INTEGER },
        price: { type: DataTypes.FLOAT },
        date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });

    return pending_transactions
}