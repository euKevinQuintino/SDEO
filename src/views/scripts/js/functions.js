const formularioBusca = document.getElementById("formularioBusca");
const formularioCadastro = document.getElementById("formularioCadastro");
const formularioObservacao = document.getElementById("formularioObservacao");
const pagina = window.location.pathname;
const socket = io();

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
      localStorage.setItem("numeroOrdem", numeroDigitado); //JSON.stringify
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
      document.getElementById("PopUpErroCadastroMaior").style.display = "flex";
    } else if (String(numeroDigitado).length > 4) {
      document.getElementById("PopUpErroCadastroMaior").style.display = "flex";
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

function CadastrarImagem(imagem, tipo) {
  let imagemP = document.getElementById(tipo);
  var imagem = document.getElementById(imagem);
  imagemP.addEventListener("change", function () {
    var imagem = this.files[0];
    if (imagem) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        imagem.setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem);
    }
  });

  /*const leitor = new FileReader();
    leitor.onload = function () {
      const bytes = new Uint8Array(this.result);
      socket.emit("upload", bytes);
      console.log(bytes);
    };
    leitor.readAsArrayBuffer(this.files[0]);*/
}
if (pagina == "/ordem.html") {
  console.log(localStorage.getItem("statusObservacao"));
  let imagemPre = document.getElementById("enviarImagemPre");
  var imagemPre01 = document.getElementById("imagemPre01");
  imagemPre.addEventListener("change", function () {
    var imagem01 = this.files[0];
    if (imagem01) {
      const leitor = new FileReader();
      leitor.addEventListener("load", function () {
        imagemPre01.setAttribute("src", this.result);
      });
      leitor.readAsDataURL(imagem01);
    }
  });
  //Alteração/Cadastro observação
  formularioObservacao.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroOrdem = localStorage.getItem("numeroOrdem");
    let novaObservacao = evento.target.elements.inputObservacao.value;
    localStorage.setItem("observacao", novaObservacao);
    if (novaObservacao.length > 255) {
      document.getElementById("PopUpErroCadastroMaior").style.display = "flex";
    } else if (novaObservacao.length <= 0) {
      socket.emit("alteracaoObservacao", null, numeroOrdem);
    } else {
      socket.emit("alteracaoObservacao", novaObservacao, numeroOrdem);
    }
  });
  socket.on("resultadoAlteracaoObservacao", function (sucessoAlteracao) {
    if (sucessoAlteracao) {
      location.reload();
    } else {
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
      console.log("erro na exclusão, fazer pop-up erro exclusão");
      document.getElementById("PopUpErroExclusaoOrdem").style.display = "flex";
    }
  });
  socket.on("temObservacao", function (temObservacao) {
    let observacaoVazia = localStorage.getItem("statusObservacao");
    localStorage.setItem("observacao", temObservacao);
    let observacao = localStorage.getItem("observacao");
    console.log(observacao);
    if (temObservacao && observacaoVazia) {
      localStorage.setItem("statusObservacao", atualizada);
      console.log(temObservacao);
      location.reload();
    }
  });
}

//Acessar observação
function AcessarObservacao() {
  let observacaoVazia = localStorage.getItem("statusObservacao");
  if (observacaoVazia) {
    document.getElementById("PopUpObservacaoVazia").style.display = "flex";
  } else {
    document.getElementById("PopUpObservacaoPreenchida").style.display = "flex";
  }
}

//Alterar observação
function AlterarObservacao() {
  document.getElementById("PopUpAlteracao").style.display = "flex";
}

//Remover ordem
function ExibirConfirmacaoExclusaoOrdem() {
  document.getElementById("PopUpExclusao").style.display = "flex";
}

function ExcluirOrdem() {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  socket.emit("exclusao", numeroOrdem);
}

//Preencher ordem
window.onload = function () {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  let observacao = localStorage.getItem("observacao");
  let statusObservacao = localStorage.getItem("statusObservacao");
  numeroOrdem.replace(/['"]+/g, " ");
  document.getElementById("conteudoObservacao").innerHTML = observacao;
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
  

  if (statusObservacao == null) {
    socket.emit("conferirObservacao", numeroOrdem);
  }
  if (statusObservacao !== "atualizada" || statusObservacao !== null) {
    document.getElementById("LinkOrdem").innerHTML = "adicionar observação";
  }
};
