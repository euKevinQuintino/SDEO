const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ordem = require("./src/models/ordens");
const imagem = require("./src/models/imagem");

app.listen(8080);
app.set("view engine");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.use("/", express.static(__dirname + "/dist"));
app.use("/", express.static(__dirname + "/dist/cadastro-ordem"));
app.use("/", express.static(__dirname + "/dist/index"));
app.use("/", express.static(__dirname + "/dist/ordem"));
app.use("/", express.static(__dirname + "/dist/resultados-busca"));

//Funcionalidades
app.post("/dist/cadastro-ordem.html", function (req, res) {
  ordem
    .create({
      numero_ordem: req.body.codigoOrdem,
    })
    .then(function (){
      res.redirect("/index.html");
    })
    .catch(function (erro) {
      res.send("ERRO: Não foi possível cadastrar a ordem." + erro);
    });
});

app.get("/RemoverOrdem", function (req, res) {
  var i; 
  localStorage.getItem("id", i);
  ordem
    .destroy({ where: { numero_ordem: i } })
    .then(function () {
      res.redirect("/index.html");
    })
    .catch(function (erro) {
      res.send("Erro: Ordem não foi deletada com sucesso! " + erro);
    });
});

app.get("/buscar-ordem", function (req, res) {
  const i = localStorage.getItem("id");
  ordem
    .findAll({ where: { numero_ordem: i } })
    .then(function () {
      res.redirect('/ordem.html')
    })
    .catch(function (erro) {
      res.send("Erro: Ordem não encontrada! " + erro);
    });
});
