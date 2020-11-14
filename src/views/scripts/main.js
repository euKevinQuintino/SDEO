const formularioBusca = document.getElementById("formularioBusca");
const formularioCadastro = document.getElementById("formularioCadastro");
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
      document.getElementById("PopUpErroBusca").style.display = "flex";
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
function AdicionarImagem(tipo) {
  if (tipo) {
    console.log("imagem pre");
  } else {
    console.log("imagem pos");
  }
}

//Alterar observação
function AlterarObservacao() {
  document.getElementById("PopUpAlteracao").style.display = "flex";
}

//Remover ordem
function RemoverOrdem() {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  socket.emit("exclusao", numeroOrdem);
}

//Preencher ordem
window.onload = function () {
  //if (pagina == "/cadastro-ordem.html") {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  numeroOrdem.replace(/['"]+/g, " ");
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
};

window.addEventListener("keydown", function (event) {
  if (event.key !== undefined) {
    //event.preventDefault();
    if (event.key == " " || "Enter") {
      document.activeElement.click();
    }
    if (event.key == "Escape") {
      fecharPopUp();
    }
    if (event.key == "F1") {
      abrirPainelAjuda();
    }
    /*if (event.key == "Backspace") {
      if (isPainelAjudaAberto) {
        if (guiaAberto !== "nenhum") {
          abrirPainelAjuda();
        } else {
          fecharPopUp();
        }
      } else {
        paraIndex();
      }
    }*/
  }
});

var isPainelAjudaAberto = false;
var guiaAberto = "nenhum";

function paraIndex() {
  window.location = "index.html";
}

function paraCadastroOrdem() {
  window.location = "cadastro-ordem.html";
}

function abrirPainelAjuda() {
  if (isPainelAjudaAberto) {
    if (guiaAberto !== "nenhum") {
      if (guiaAberto == "consulta") {
        document.getElementById("AjudaConsulta").style.display = "none";
      } else if (guiaAberto == "cadastro") {
        document.getElementById("AjudaCadastro").style.display = "none";
      } else if (guiaAberto == "alteracao") {
        document.getElementById("AjudaAlteracao").style.display = "none";
      } else if (guiaAberto == "adicaoImagem") {
        document.getElementById("AjudaAdicaoImagem").style.display = "none";
      } else if (guiaAberto == "remocaoImagem") {
        document.getElementById("AjudaRemocaoImagem").style.display = "none";
      } else if (guiaAberto == "extra") {
        document.getElementById("AjudaExtra").style.display = "none";
      }
      document.querySelector(".modal-ajuda__content__items").style.display =
        "block";
      guiaAberto = "nenhum";
      isPainelAjudaAberto = true;
    }
  } else {
    document.querySelector(".modal-ajuda").style.display = "flex";
    document.querySelector(".modal-ajuda__content__items").style.display =
      "block";
    isPainelAjudaAberto = true;
  }
}

function abrirItemAjuda(item) {
  document.querySelector(".modal-ajuda__content__items").style.display = "none";
  if (item == "consulta") {
    document.getElementById("AjudaConsulta").style.display = "block";
    guiaAberto = "consulta";
  } else if (item == "cadastro") {
    document.getElementById("AjudaCadastro").style.display = "block";
    guiaAberto = "cadastro";
  } else if (item == "alteracao") {
    document.getElementById("AjudaAlteracao").style.display = "block";
    guiaAberto = "alteracao";
  } else if (item == "adicaoImagem") {
    document.getElementById("AjudaAdicaoImagem").style.display = "block";
    guiaAberto = "adicaoImagem";
  } else if (item == "remocaoImagem") {
    document.getElementById("AjudaRemocaoImagem").style.display = "block";
    guiaAberto = "remocaoImagem";
  } else if (item == "extra") {
    document.getElementById("AjudaExtra").style.display = "block";
    guiaAberto = "extra";
  }
}

function fecharPopUp() {
  if (isPainelAjudaAberto) {
    document.querySelector(".modal-ajuda").style.display = "none";
    if (guiaAberto == "consulta") {
      document.getElementById("AjudaConsulta").style.display = "none";
    } else if (guiaAberto == "cadastro") {
      document.getElementById("AjudaCadastro").style.display = "none";
    } else if (guiaAberto == "alteracao") {
      document.getElementById("AjudaAlteracao").style.display = "none";
    } else if (guiaAberto == "adicaoImagem") {
      document.getElementById("AjudaAdicaoImagem").style.display = "none";
    } else if (guiaAberto == "remocaoImagem") {
      document.getElementById("AjudaRemocaoImagem").style.display = "none";
    } else if (guiaAberto == "extra") {
      document.getElementById("AjudaExtra").style.display = "none";
    }
    isPainelAjudaAberto = false;
    guiaAberto = "nenhum";
  }
  if (pagina == "/cadastro-ordem.html") {
    document.getElementById("PopUpCadastro").style.display = "none";
    document.getElementById("PopUpErroCadastroExiste").style.display = "none";
    document.getElementById("PopUpErroCadastroMaior").style.display = "none";
  }
  if (pagina == "/index.html" || pagina == "/resultados-busca.html") {
    document.getElementById("PopUpErroBusca").style.display = "none";
  }
  if (pagina == "/ordem.html") {
    document.getElementById("PopUpRemocao").style.display = "none";
    document.getElementById("PopUpErroRemocao").style.display = "none";
    document.getElementById("PopUpErroAlteracao").style.display = "none";
  }
}

function AbrirPopUpCadastro() {
  document.getElementById("PopUpCadastro").style.display = "flex";
}

function AbrirPopUpRemocao() {
  document.getElementById("PopUpRemocao").style.display = "flex";
}
