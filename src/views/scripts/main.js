var numeroDigitado = 0;
var numeroOrdem = 0;

function BuscarOrdem(numeroDigitado) {
  numeroDigitado = document.getElementById("inputBusca").value;
  localStorage.setItem("codigo", JSON.stringify(numeroDigitado));
  window.location = "resultados-busca.html" + "?codigo=" + numeroDigitado;
  numeroOrdem = numeroDigitado;
}

function CadastrarOrdem(numeroDigitado) {
  numeroDigitado = document.getElementById("inputCadastro").value;
  localStorage.setItem("codigo", JSON.stringify(numeroDigitado));
  window.location = "resultados-busca.html" + "?codigo=" + numeroDigitado;
  numeroOrdem = numeroDigitado;
  AbrirPopUpCadastro();
}

window.onload = function() { 
  PreencherOrdem(numeroOrdem);
}

function PreencherOrdem(numeroOrdem) {
  numeroOrdem = localStorage.getItem("codigo");
  numeroOrdem.replace(/['"]+/g, ' ');
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
}

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
  document.getElementById("PopUpCadastro").style.display = "none";
  document.getElementById("PopUpRemocao").style.display = "none";
}

function AbrirPopUpCadastro() {
  document.getElementById("PopUpCadastro").style.display = "flex";
}

function AbrirPopUpRemocao() {
  document.getElementById("PopUpRemocao").style.display = "flex";
}
