const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const ejs = require("ejs");
const Ordem = require("../models/Ordem");
const Imagem = require("../models/Imagem");
const { Op } = require("sequelize");
const server = http.createServer(app);
const io = socketio(server);
const fs = require("fs");

server.listen(1234);

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.set("views", path.join(__dirname, "../../dist"));
app.use(express.static(path.join(__dirname, "../../dist")));
app.use("/", express.static(__dirname + "../../dist/index"));
app.use("/", express.static(__dirname + "../../dist/cadastro-Ordem"));
app.use("/", express.static(__dirname + "../../dist/Ordem"));
app.use("/", express.static(__dirname + "../../dist/resultados-busca"));

// multer
const storage = multer.diskStorage({
  destination: "../../dist/temp/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("imagemPre");

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
  //Exclusão
  socket.on("exclusao", (numeroOrdem) => {
    RemoverOrdem(numeroOrdem);
  });
  socket.on("conferirObservacao", (numeroOrdem) => {
    if (!(Ordem.count({
      where: {
        numeroOrdem: numeroOrdem,
        observacaoOrdem: null,
      },
    }))) {
      socket.emit("temObservacao", true)
    } else {
      socket.emit("temObservacao", false)
    }
  })
  socket.on("upload", async (imagem) => {
    //CadastrarImagem(imagem);
    const buffer = Buffer.from(imagem); // está parando aqui
    await fs.writeFile("../../dist/tmp/image", buffer).catch(console.error); // fs.promises
    //await fs.writeFile("/tmp/image", buffer).catch(console.error); // fs.promises
    socket.emit("retornoImagem", imagem.toString("base64"));
    console.log(imagem);
  });
});

// funções database
async function BuscarOrdem(numeroOrdemDigitado) {
  const cadastrado = await Ordem.count({
    where: {
      numeroOrdem: numeroOrdemDigitado,
    },
  });
  if (cadastrado) {
    io.emit("sucessoBusca", true);
  } else {
    io.emit("sucessoBusca", false);
  }
}

function CadastrarOrdem(numeroOrdemDigitado) {
  if (
    Ordem.findAll({
      where: { numeroOrdem: numeroOrdemDigitado },
    })
  ) {
    Ordem.create({
      numeroOrdem: numeroOrdemDigitado,
      ordemRemovida: 0,
    })
      .then(() => {
        console.log("[CADASTRO] Ordem cadastrada com sucesso!");
        io.emit("sucessoCadastro", true);
      })
      .catch((erro) => {
        console.log(
          "[CADASTRO] Erro: Não foi possível cadastrar a Ordem: " + erro
        );
        io.emit("sucessoCadastro", false);
      });
  } else {
    console.log("[CADASTRO] Erro: Ordem já existe");
    io.emit("sucessoCadastro", false);
  }
}

function RemoverOrdem(numeroOrdemDigitado) {
  Ordem.destroy({ where: { numeroOrdem: numeroOrdemDigitado } })
    .then(() => {
      console.log("[EXCLUSÃO] Ordem removida com sucesso!");
      io.emit("sucessoExclusao", true);
    })
    .catch((erro) => {
      console.log("[EXCLUSÃO] Erro: Não foi possível remover a ordem: " + erro);
      io.emit("sucessoExclusao", false);
    });
}

function CadastrarImagem(imagem, tipo) {
  //upload(imagem);
}
