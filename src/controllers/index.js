const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const app = express();

//bd
const { Op } = require("sequelize");
const Ordem = require("../models/Ordem");
const Imagem = require("../models/Imagem");

const server = http.createServer(app);
const io = socketio(server);

server.listen(1234);

app.set("views", path.join(__dirname, "../../dist"));
app.use(express.static(path.join(__dirname, "../../dist")));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.use("/", express.static(__dirname + "../../dist/index"));
app.use("/", express.static(__dirname + "../../dist/cadastro-Ordem"));
app.use("/", express.static(__dirname + "../../dist/Ordem"));
app.use("/", express.static(__dirname + "../../dist/resultados-busca"));

io.on("connection", (socket) => {
  console.log("[SERVER-SIDE] Socket conectado:", socket.id);
  //Busca
  socket.on("busca", (numeroDigitado) => {
    BuscarOrdem(numeroDigitado);
  });
  //Cadastro
  socket.on("cadastro", (numeroDigitado) => {
    CadastrarOrdem(numeroDigitado);
  });
});

// funções database
function BuscarOrdem(numeroOrdemDigitado) {
  Ordem.findAll({
    where: {
      [Op.and]: [
        { numeroOrdem: numeroOrdemDigitado },
        { ordemRemovida: { [Op.not]: 0 } },
      ],
    },
  })
    .then(function () {
      console.log("[BUSCA] Ordem encontrada!");
      io.emit("sucessoBusca", true);
    })
    .catch(function (erro) {
      console.log("[BUSCA] Erro: Ordem não encontrada: " + erro);
      io.emit("sucessoBusca", false);
    });
}

function CadastrarOrdem(numeroOrdemDigitado) {
  Ordem.create({
    numeroOrdem: numeroOrdemDigitado,
    ordemRemovida: 0,
  })
    .then(function () {
      console.log("[CADASTRO] Ordem cadastrada com sucesso!");
      io.emit("sucessoCadastro", true);
    })
    .catch(function (erro) {
      console.log(
        "[CADASTRO] Erro: Não foi possível cadastrar a Ordem: " + erro
      );
      io.emit("sucessoCadastro", false);
    });
}
