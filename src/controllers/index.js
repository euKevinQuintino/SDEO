const express = require("express");
const app = express();
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const ordem = require("../models/Ordem");
const imagem = require("../models/Imagem");
var path = require("path");
var numeroOrdemDigitado = 0;

app.listen(1234);
//app.set("html", "view engine", "pug");
app.set("views", path.join(__dirname, "../../dist/"));
app.use(express.static(path.join(__dirname, "../../dist")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "../../dist/index"));
app.use("/", express.static(__dirname + "../../dist/cadastro-ordem"));
app.use("/", express.static(__dirname + "../../dist/ordem"));
app.use("/", express.static(__dirname + "../../dist/resultados-busca"));

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/resultados-busca", function (req, res) {
  res.render("resultados-busca.html");
});

app.get("/busca", function (req, res) {
  numeroOrdemDigitado = req.body.codigo;
  ordem
    .findAll({
      where: {
        numeroOrdem: numeroOrdemDigitado,
        /*[Op.and]: [
          { numeroOrdem: numeroOrdemDigitado },
          { ordemRemovida: { [Op.not]: 0 } },
        ],*/
      },
    })
    .then(function (numeroOrdem) {
      res.redirect("resultados-busca.html");
      res.render("resultados-busca.html", { numeroOrdem: numeroOrdemDigitado });
    })
    .catch(function (erro) {
      res.send("[BUSCA] Erro: Ordem não encontrada: " + erro);
    });
});

app.post("/cadastro", function (req, res) {
  numeroOrdemDigitado = req.body.numeroOrdem;
  ordem
    .create({
      numeroOrdem: numeroOrdemDigitado,
      ordemRemovida: 0
    })
    .then(function () {
      console.log("[CADASTRO] Ordem cadastrada com sucesso!");
    })
    .catch(function (erro) {
      console.log("[CADASTRO] Erro: Não foi possível cadastrar a ordem: " + erro);
    });
});

app.get("/exclusao", function (req, res) {
  var numeroDigitado;
  localStorage.getItem("codigo", numeroDigitado);
  ordem
    .destroy({ where: { numeroOrdem: numeroDigitado } })
    .then(function () {
      res.redirect("/index.html");
      console.log("[EXCLUSAO] Ordem excluída com sucesso!");
    })
    .catch(function (erro) {
      res.send("[EXCLUSAO] Erro: Não foi possível excluir a ordem: " + erro);
    });
});
