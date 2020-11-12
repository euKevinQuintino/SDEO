const database = require("./database");

const ordem = database.sequelize.define(
  "ordem",
  {
    numeroOrdem: {
      type: database.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    observacaoOrdem: {
      type: database.Sequelize.STRING,
    },
    ordemRemovida: {
      type: database.Sequelize.TINYINT(1),
    },
  },
  {
    timestamps: false,
  }
);

//Cria a tabela
ordem.sync({ force: false });

module.exports = ordem;
