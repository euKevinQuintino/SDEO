const formularioBusca = document.getElementById("formularioBusca");
const formularioCadastro = document.getElementById("formularioCadastro");
const formularioObservacao = document.getElementById("formularioObservacao");
const formularioObservacaoEdicao = document.getElementById(
  "formularioObservacaoEdicao"
);
const pagina = window.location.pathname;
const socket = io();

var quantidadeImagemPre = 0;
var quantidadeImagemPos = 0;

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

//Adicionar imagem
function AmpliarImagem(imagem) {
  document.getElementById("PopUpImagem").style.display = "none";
  leitor.readAsDataURL(imagem);
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
  let inputImagemPos = document.getElementById("enviarImagemPos");
  inputImagemPre.addEventListener("change", function () {
    CriarItemImagem(0);
    let imagemPre = document.getElementById(
      "imagemPre" + String(quantidadeImagemPre)
    );
    var imagem = this.files[0];
    if (imagem) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        imagemPre.setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem);
    }
  });
  let inputImagemPos = document.getElementById("enviarImagemPos");
  inputImagemPos.addEventListener("change", function () {
    CriarItemImagem(1);
    let imagemPos = document.getElementById(
      "imagemPos" + String(quantidadeImagemPos)
    );
    var imagem = this.files[0];
    if (imagem) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        imagemPos.setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem);
    }
  });
  document.getElementById("enviarImagemPre").addEventListener(
    "change",
    function () {
      const reader = new FileReader();
      reader.onload = function () {
        const bytes = this.result.replace(/.*base64,/, "");
        socket.emit("image", bytes);
      };
      reader.readAsDataURL(this.files[0]);
    },
    false
  );
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
    imagemPre02.setAttribute("src", image);
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
  if (!pos) {
    if (quantidadeImagemPre < 8) {
      if (quantidadeImagemPre == 7) {
        document.getElementById("inputImagemPreExecucao").style.display =
          "none";
      }
      quantidadeImagemPre += 1;
      console.log(quantidadeImagemPre);
      let pictureBorder = document.createElement("div");
      let removeIconDiv = document.createElement("div");
      let imagem = document.createElement("img");
      let removeIcon = document.createElement("i");
      pictureBorder.className = "system__order-details__image-grid__picture";
      removeIconDiv.className =
        "system__order-details__image-grid__picture__remove";
      imagem.setAttribute("id", "imagemPre" + String(quantidadeImagemPre));
      let idImagem = "imagemPreQuadro" + String(quantidadeImagemPre);
      removeIconDiv.addEventListener("click", function (evento) {
        RemoverImagem(idImagem, 0, 0);
        evento.preventDefault();
      });
      /*.setAttribute(
        "onclick",
        "RemoverImagem(imagemPreQuadro" + String(quantidadeImagemPre) + ", 0, 0)"
      );*/
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
  } else {
    if (quantidadeImagemPos < 8) {
      if (quantidadeImagemPos == 7) {
        document.getElementById("inputImagemPosExecucao").style.display =
          "none";
      }
      quantidadeImagemPos += 1;
      let pictureBorder = document.createElement("div");
      let removeIconDiv = document.createElement("div");
      let imagem = document.createElement("img");
      let removeIcon = document.createElement("i");
      pictureBorder.className = "system__order-details__image-grid__picture";
      removeIconDiv.className =
        "system__order-details__image-grid__picture__remove";
      let idImagem = "imagemPosQuadro" + String(quantidadeImagemPos);
      removeIconDiv.addEventListener("click", function (evento) {
        RemoverImagem(idImagem, 1, 0);
        evento.preventDefault();
      });
      imagem.setAttribute("id", "imagemPos" + String(quantidadeImagemPos));
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
  }
}
function RemoverImagem(id, pos, confirmou) {
  if (confirmou) {
    if (pos) {
      document.getElementById(id).remove();
      quantidadeImagemPos -= 1;
      console.log(quantidadeImagemPos);
      localStorage.setItem("primeiraVez", 1);
      ExibirBotaoAdicaoImagem(pos);
    } else {
      console.log(quantidadeImagemPre);
      document.getElementById(id).remove();
      quantidadeImagemPre -= 1;
      console.log(quantidadeImagemPre);
      localStorage.setItem("primeiraVez", 1);
      ExibirBotaoAdicaoImagem(pos);
    }
  } else {
    localStorage.setItem("idImagem", id);
    localStorage.setItem("imagemPos", pos);
    document.getElementById("PopUpExclusaoImagem").style.display = "flex";
  }
}

function ConfirmarRemocaoImagem() {
  let imagemPos = localStorage.getItem("imagemPos");
  let idImagem = localStorage.getItem("idImagem");
  RemoverImagem(idImagem, imagemPos, 1);
  fecharPopUp();
  localStorage.removeItem("imagemPos");
  localStorage.removeItem("idImagem");
}

function ExibirBotaoAdicaoImagem(pos) {
  let primeiraVez = localStorage.getItem("primeiraVez");
  if (pos) {
    document.getElementById("inputImagemPreExecucao").style.display = "block";
  } else {
    document.getElementById("inputImagemPreExecucao").style.display = "block";
  }
  if (primeiraVez) {
    localStorage.removeItem("primeiraVez");
    setTimeout(ExibirBotaoAdicaoImagem, 16);
  }
}
//Preencher ordem
window.onload = function () {};

if (pagina !== "/ordem.html") {
  localStorage.setItem("statusObservacao", "desatualizada");
}
