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
/*
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
*/

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
    .then(function () {
      res.redirect("/");
    })
    .catch(function (erro) {
      res.send("ERRO: Não foi possível cadastrar a ordem." + erro);
    });
});
