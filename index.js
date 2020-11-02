const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ordem = require("./src/models/ordens");
const imagem = require("./src/models/imagem");

app.listen(1234);
app.set("view engine");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/dist/cadastro-ordem.html", function (req, res) {
  res.sendFile(__dirname + "/dist/cadastro-ordem.html");
});

app.get("/dist/", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/dist/ordem.html", function (req, res) {
  res.sendFile(__dirname + "/dist/ordem.html");
});

app.get("/dist/resultados-busca.html", function (req, res) {
  res.sendFile(__dirname + "/dist/resultados-busca.html");
});

//Funcionalidades
app.post("/dist/cadastro-ordem.html", function (req, res) {
  ordem
    .create({
      numero_ordem: req.body.codigoOrdem,
    })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (erro) {
      res.send("Erro: Ordem não foi cadastrada com sucesso! " + erro);
    });
});
