const db = require('./db')

const ordens = db.sequelize.define('ordens', {
    numero_ordem: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    observacao_ordem: {
        type: db.Sequelize.STRING
    },
    ordem_removida: {
        type: db.Sequelize.TINYINT(1)
    }
 },{
    timestamps : false
})

//Criar a tabela
ordens.sync({force: false})

module.exports = ordens

