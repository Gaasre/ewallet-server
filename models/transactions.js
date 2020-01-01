module.exports = (sequelize, DataTypes) => {

    const transactions = sequelize.define('transactions', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        sellerid: { type: DataTypes.INTEGER },
        buyerid: { type: DataTypes.INTEGER },
        price: { type: DataTypes.FLOAT }
    });

    return transactions
}