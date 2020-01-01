module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('users', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        balance: { type: DataTypes.FLOAT, defaultValue: 0}
    });

    return users
}