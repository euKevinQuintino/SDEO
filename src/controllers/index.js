const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ordem = require("../models/ordem");
const imagem = require("../models/imagem");

app.listen(8080);
app.set("view engine");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "../../dist/index"));
app.use("/", express.static(__dirname + "../../dist/cadastro-ordem"));
app.use("/", express.static(__dirname + "../../dist/ordem"));
app.use("/", express.static(__dirname + "../../dist/resultados-busca"));

app.post("/cadastro", function (req, res) {
  ordem
    .create({
      numeroOrdem: req.body.codigoOrdem,
    })
    .then(function (){
      res.redirect("/index.html");
    })
    .catch(function (erro) {
      res.send("ERRO: Não foi possível cadastrar a ordem." + erro);
    });
});

app.get("/exclusao", function (req, res) {
  var i; 
  localStorage.getItem("id", i);
  ordem
    .destroy({ where: { numeroOrdem: i } })
    .then(function () {
      res.redirect("/index.html");
    })
    .catch(function (erro) {
      res.send("Erro: Ordem não foi deletada com sucesso! " + erro);
    });
});

app.get("/busca", function (req, res) {
  const i = localStorage.getItem("id");
  ordem
    .findAll({ where: { numeroOrdem: i } })
    .then(function () {
      res.redirect('/ordem.html')
    })
    .catch(function (erro) {
      res.send("Erro: Ordem não encontrada! " + erro);
    });
});
