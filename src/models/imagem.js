const database = require("./database");
const ordem = require("./ordem");

const imagem = database.sequelize.define(
  "imagem",
  {
    numeroImagem: {
      type: database.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroOrdem: {
      type: database.Sequelize.INTEGER,
      model: "ordem",
      key: "numeroOrdem",
      unique: true,
    },
    imagemPreExecucao: {
      type: database.Sequelize.STRING,
    },
    imagemPosExecucao: {
      type: database.Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
ordem.hasMany(imagem, { foreignkey: "numeroOrdem" });

//Cria a tabela
imagem.sync({ force: false });

module.exports = imagem;
