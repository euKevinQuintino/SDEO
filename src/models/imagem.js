const db = require("./db");
const ordem = require("./ordens");

const imagem = db.sequelize.define(
  "imagem",
  {
    numero_imagem: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_ordem: {
      type: db.Sequelize.INTEGER,
      model: "ordens",
      key: "numero_ordem",
      unique: true,
    },
    imagem_pre_execucao: {
      type: db.Sequelize.STRING,
    },
    imagem_pos_execucao: {
      type: db.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
ordem.hasMany(imagem, { foreignkey: "numero_ordem" });

//Criar a tabela
imagem.sync({ force: false });

module.exports = imagem;
