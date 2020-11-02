const Sequelize = require("sequelize")

const sequelize = new Sequelize('imagens', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}