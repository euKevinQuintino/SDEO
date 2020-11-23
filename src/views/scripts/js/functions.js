const formularioBusca = document.getElementById("formularioBusca");
const formularioCadastro = document.getElementById("formularioCadastro");
const formularioObservacao = document.getElementById("formularioObservacao");
const formularioObservacaoEdicao = document.getElementById(
  "formularioObservacaoEdicao"
);
const pagina = window.location.pathname;
const socket = io();

localStorage.setItem("quantidadeImagemPre", 0);
localStorage.setItem("limitePre", 0);
localStorage.setItem("limitePos", 0);
localStorage.setItem("quantidadeImagemPos", 0);
localStorage.setItem("houveExclusaoPre", 0);
localStorage.setItem("houveExclusaoPos", 0);

//Acessar ordem
function AcessarOrdem() {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  window.location = "ordem.html" + "?numero=" + numeroOrdem;
}

//Buscar ordem
if (pagina == "/index.html") {
  formularioBusca.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroDigitado = evento.target.elements.numeroBusca.value;
    if (
      String(numeroDigitado).length == 0 ||
      String(numeroDigitado).length > 4 ||
      numeroDigitado <= 0
    ) {
      document.getElementById("PopUpErroBuscaIntervalo").style.display = "flex";
    } else {
      localStorage.setItem("numeroOrdem", numeroDigitado);
      socket.emit("busca", numeroDigitado);
    }
  });
  socket.on("sucessoBusca", function (sucessoBusca) {
    if (sucessoBusca) {
      numeroOrdem = localStorage.getItem("numeroOrdem");
      AcessarOrdem();
    } else {
      document.getElementById("PopUpErroBusca").style.display = "flex";
    }
  });
}

//Cadastrar ordem buscada
function CadastrarOrdemBuscada() {
  let numeroBuscado = localStorage.getItem("numeroOrdem");
  socket.emit("cadastro", numeroBuscado);
  socket.on("sucessoCadastro", function () {
    AcessarOrdem();
  });
}

//Cadastrar ordem
if (pagina == "/cadastro-ordem.html") {
  formularioCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroDigitado = evento.target.elements.numeroCadastro.value;
    if (String(numeroDigitado).length == 0 || numeroDigitado <= 0) {
      document.getElementById("PopUpErroBuscaIntervalo").style.display = "flex";
    } else if (String(numeroDigitado).length > 4) {
      document.getElementById("PopUpErroBuscaIntervalo").style.display = "flex";
    } else {
      localStorage.setItem("numeroOrdem", numeroDigitado);
      socket.emit("cadastro", numeroDigitado);
    }
  });
  socket.on("sucessoCadastro", function (sucessoCadastro) {
    if (sucessoCadastro) {
      document.getElementById("PopUpCadastro").style.display = "flex";
    } else {
      document.getElementById("PopUpErroCadastroExiste").style.display = "flex";
    }
  });
}

if (pagina !== "/ordem.html") {
  localStorage.setItem("statusObservacao", "desatualizada");
}

if (pagina == "/ordem.html") {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  let observacao = localStorage.getItem("observacao");
  let statusObservacao = localStorage.getItem("statusObservacao");
  document.getElementById("conteudoObservacao").innerHTML = observacao;
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
  socket.emit("conferirObservacao", numeroOrdem);
  if (statusObservacao == "atualizada" && observacao == null) {
    document.getElementById("LinkOrdem").innerHTML = "adicionar observação";
  }
  //Imagens
  let inputImagemPre = document.getElementById("enviarImagemPre");
  inputImagemPre.addEventListener("change", function () {
    let quantidadeImagemPre = localStorage.getItem("quantidadeImagemPre");
    CriarItemImagem(0);
    var imagemPre = "imagemPre" + String(++quantidadeImagemPre);
    var imagem = this.files[0];
    if (imagem) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        console.log(imagemPre);
        document.getElementById(imagemPre).setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem);
    }
  });
  let inputImagemPos = document.getElementById("enviarImagemPos");
  inputImagemPos.addEventListener("change", function () {
    let quantidadeImagemPos = localStorage.getItem("quantidadeImagemPos");
    CriarItemImagem(1);
    var imagemPos = "imagemPos" + String(++quantidadeImagemPos);
    var imagem = this.files[0];
    if (imagem) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        console.log(imagemPos);
        document.getElementById(imagemPos).setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem);
    }
  });
  //Alteração/Cadastro observação
  formularioObservacao.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroOrdem = localStorage.getItem("numeroOrdem");
    let novaObservacao = evento.target.elements.inputObservacao.value;
    if (novaObservacao.length > 255) {
      document.getElementById("PopUpObservacaoVazia").style.display = "none";
      document.getElementById("PopUpErroEdicaoObservacao").style.display =
        "flex";
    } else if (novaObservacao.length <= 0) {
      localStorage.removeItem("observacao");
      socket.emit("alteracaoObservacao", null, numeroOrdem);
    } else {
      localStorage.setItem("statusObservacao", "desatualizada");
      socket.emit("alteracaoObservacao", novaObservacao, numeroOrdem);
    }
  });
  formularioObservacaoEdicao.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroOrdem = localStorage.getItem("numeroOrdem");
    let novaObservacao = evento.target.elements.inputObservacao.value;
    localStorage.setItem("observacao", novaObservacao);
    if (novaObservacao.length > 255) {
      document.getElementById("PopUpEdicaoObservacao").style.display = "none";
      document.getElementById("PopUpErroEdicaoObservacao").style.display =
        "flex";
    } else if (novaObservacao.length <= 0) {
      localStorage.removeItem("observacao");
      socket.emit("alteracaoObservacao", null, numeroOrdem);
    } else {
      localStorage.removeItem("observacao");
      localStorage.setItem("statusObservacao", "desatualizada");
      socket.emit("alteracaoObservacao", novaObservacao, numeroOrdem);
    }
  });
  socket.on("resultadoAlteracaoObservacao", function (sucessoAlteracao) {
    if (sucessoAlteracao) {
      location.reload();
    } else {
      document.getElementById("PopUpEdicaoObservacao").style.display = "none";
      document.getElementById("PopUpErroEdicaoObservacao").style.display =
        "flex";
    }
  });
  socket.on("sucessoCadastro", function (sucessoCadastro) {
    if (sucessoCadastro) {
      document.getElementById("PopUpCadastro").style.display = "flex";
    } else {
      document.getElementById("PopUpErroCadastroExiste").style.display = "flex";
    }
  });
  socket.on("sucessoExclusao", function (sucessoExclusao) {
    if (sucessoExclusao) {
      paraIndex();
    } else {
      document.getElementById("PopUpErroExclusaoOrdem").style.display = "flex";
    }
  });
  socket.on("temObservacao", function (temObservacao) {
    let statusObservacao = localStorage.getItem("statusObservacao");
    if (temObservacao !== null) {
      localStorage.setItem("observacao", temObservacao);
    } else {
      localStorage.removeItem("observacao");
    }
    let statusObservacao = localStorage.getItem("statusObservacao");
    if (statusObservacao == "desatualizada") {
      localStorage.setItem("statusObservacao", "atualizada");
      location.reload();
    }
  });
  socket.on("imagemVolta", function (buffer) {
    var image = new Image();
    image = "data:image/png;base64," + buffer;
    document.getElementById("imagemPopUp").setAttribute("src", image);
  });
}

//Acessar observação
function AcessarObservacao() {
  let observacao = localStorage.getItem("observacao");
  if (observacao == null) {
    document.getElementById("PopUpObservacaoVazia").style.display = "flex";
  } else {
    document.getElementById("PopUpObservacaoPreenchida").style.display = "flex";
  }
}

//Alterar observação
function ExibirConfirmacaoAlteracaoObservacao() {
  document.getElementById("PopUpEdicaoObservacao").style.display = "none";
  document.getElementById("PopUpConfirmacaoAlteracao").style.display = "flex";
}

//Confirma alterações na observação
function ConfirmarEdicaoObservacao() {
  let novaObservacao = evento.target.elements.inputObservacao.value;
  if (novaObservacao.length > 255) {
    document.getElementById("PopUpEdicaoObservacao").style.display = "none";
    document.getElementById("PopUpErroEdicaoObservacao").style.display = "flex";
  } else {
    let numeroOrdem = localStorage.getItem("numeroOrdem");
    localStorage.removeItem("observacao");
    socket.emit("alteracaoObservacao", novaObservacao, numeroOrdem);
  }
}

//Remover ordem
function ExibirConfirmacaoExclusaoOrdem() {
  document.getElementById("PopUpExclusao").style.display = "flex";
}

function ExcluirOrdem() {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  socket.emit("exclusao", numeroOrdem);
}

//Imagens
function CriarItemImagem(pos) {
  if (pos) {
    let quantidadeImagemPos = localStorage.getItem("quantidadeImagemPos");
    let limitePos = localStorage.getItem("limitePos");
    if (limitePos < 8) {
      if (limitePos == 7) {
        document.getElementById("inputImagemPosExecucao").style.display =
          "none";
      }
      localStorage.setItem("quantidadeImagemPos", ++quantidadeImagemPos);
      localStorage.setItem("limitePos", ++limitePos);
      let pictureBorder = document.createElement("div");
      let removeIconDiv = document.createElement("div");
      let imagem = document.createElement("img");
      let removeIcon = document.createElement("i");
      pictureBorder.className = "system__order-details__image-grid__picture";
      removeIconDiv.className =
        "system__order-details__image-grid__picture__remove";
      imagem.setAttribute("id", "imagemPos" + String(quantidadeImagemPos));
      let idImagem = "imagemPosQuadro" + String(quantidadeImagemPos);
      imagem.addEventListener("click", function (evento) {
        AmpliarImagem("imagemPos" + String(quantidadeImagemPos));
        evento.preventDefault();
      });
      removeIconDiv.addEventListener("click", function (evento) {
        RemoverImagem(idImagem, 1, false);
        evento.preventDefault();
      });
      pictureBorder.setAttribute(
        "id",
        "imagemPosQuadro" + String(quantidadeImagemPos)
      );
      removeIcon.className = "fas";
      removeIcon.classList.add("fa-times");
      removeIconDiv.appendChild(removeIcon);
      pictureBorder.appendChild(removeIconDiv);
      pictureBorder.appendChild(imagem);
      document.querySelector(".posExecucao").appendChild(pictureBorder);
    } else {
      console.log("imagemPos lotada");
    }
  } else {
    let quantidadeImagemPre = localStorage.getItem("quantidadeImagemPre");
    let limitePre = localStorage.getItem("limitePre");
    if (limitePre < 8) {
      if (limitePre == 7) {
        document.getElementById("inputImagemPreExecucao").style.display =
          "none";
      }
      localStorage.setItem("quantidadeImagemPre", ++quantidadeImagemPre);
      localStorage.setItem("limitePre", ++limitePre);
      let pictureBorder = document.createElement("div");
      let removeIconDiv = document.createElement("div");
      let imagem = document.createElement("img");
      let removeIcon = document.createElement("i");
      removeIconDiv.className =
        "system__order-details__image-grid__picture__remove";
      imagem.setAttribute("id", "imagemPre" + String(quantidadeImagemPre));
      let idImagem = "imagemPreQuadro" + String(quantidadeImagemPre);
      pictureBorder.className = "system__order-details__image-grid__picture";
      imagem.addEventListener("click", function (evento) {
        AmpliarImagem("imagemPre" + String(quantidadeImagemPre));
        evento.preventDefault();
      });
      removeIconDiv.addEventListener("click", function (evento) {
        RemoverImagem(idImagem, 0, 0);
        evento.preventDefault();
      });
      pictureBorder.setAttribute(
        "id",
        "imagemPreQuadro" + String(quantidadeImagemPre)
      );
      removeIcon.className = "fas";
      removeIcon.classList.add("fa-times");
      removeIconDiv.appendChild(removeIcon);
      pictureBorder.appendChild(removeIconDiv);
      pictureBorder.appendChild(imagem);
      document.querySelector(".preExecucao").appendChild(pictureBorder);
    } else {
      console.log("imagemPre lotada");
    }
  }
}

function AmpliarImagem(idImagem) {
  let imagem = document.getElementById(idImagem).src;
  let imagemPopUp = document.getElementById("imagemPopUp");
  imagemPopUp.setAttribute("src", imagem);
  document.getElementById("PopUpImagem").style.display = "flex";
  let downloadImagem = imagem.replace(
    /^data:image\/[^;]+/,
    "data:application/octet-stream"
  );
  document
    .getElementById("botaoBaixarImagem")
    .setAttribute("href", downloadImagem);
}

function RemoverImagem(id, pos, confirmou) {
  if (confirmou) {
    if (pos == 1) {
      localStorage.setItem("houveExclusaoPos", true);
      document.getElementById(id).remove();
      let limitePos = localStorage.getItem("limitePos");
      localStorage.setItem("limitePos", --limitePos);
      localStorage.setItem("primeiraVez", true);
      if (limitePos == 7 || eraOito) {
        ExibirBotaoAdicaoImagem(pos);
        var eraOito = false;
      }
    } else {
      let limitePre = localStorage.getItem("limitePre");
      localStorage.setItem("limitePre", --limitePre);
      localStorage.setItem("houveExclusaoPre", true);
      document.getElementById(id).remove();
      localStorage.setItem("primeiraVez", true);
      if (limitePre == 7 || eraOito) {
        ExibirBotaoAdicaoImagem(pos);
        var eraOito = false;
      }
    }
  } else {
    localStorage.setItem("idImagem", id);
    localStorage.setItem("imagemPos", pos);
    document.getElementById("PopUpExclusaoImagem").style.display = "flex";
  }
}

function ExibirBotaoAdicaoImagem(pos) {
  let primeiraVez = localStorage.getItem("primeiraVez");
  if (pos == 1) {
    document.getElementById("inputImagemPosExecucao").style.display = "block";
  } else {
    document.getElementById("inputImagemPreExecucao").style.display = "block";
  }
  if (primeiraVez) {
    localStorage.removeItem("primeiraVez");
    //setTimeout(ExibirBotaoAdicaoImagem, 16);
  }
}

function ConfirmarRemocaoImagem() {
  let imagemPos = localStorage.getItem("imagemPos");
  let idImagem = localStorage.getItem("idImagem");
  RemoverImagem(idImagem, imagemPos, true);
  fecharPopUp();
  localStorage.removeItem("imagemPos");
  localStorage.removeItem("idImagem");
}
