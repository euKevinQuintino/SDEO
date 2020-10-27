window.addEventListener("keydown", function (event) {
  if (event.key !== undefined) {
    if (event.key === ' ' || 'Enter') {
      //event.preventDefault();
      document.activeElement.click();
    }
    if (event.key === 'Escape') {
      //event.preventDefault();
      paraIndex();
    }
    if (event.key === 'F1') {
      //event.preventDefault();
      paraPainelAjuda();
    }
  }
});

var popUpAberto = 'ajuda'
var itemAberto = 'nenhum'
function paraIndex() {
  window.location = "index.html";
}
function paraCadastroOrdem() {
  window.location = "cadastro-ordem.html";
}
function abrirPainelAjuda() {
  document.getElementsByClassName('modal-ajuda').style.display = "flex";
}
function abrirItemAjuda(item) {
  if (item == 'consulta') {
    document.getElementById('AjudaConsulta').style.display = "flex";
  } else if (item == 'cadastro') {
    document.getElementById('AjudaCadastro').style.display = "flex";
  } else if (item == 'alteracao') {
    document.getElementById('AjudaAlteracao').style.display = "flex";
  } else if (item == 'adicao-imagens') {
    document.getElementById('AjudaAdicaoImagens').style.display = "flex";
  } else if (item == 'remocao-imagens') {
    document.getElementById('AjudaRemocaoImagens').style.display = "flex";
  } else if (item == 'extra') {
    document.getElementById('AjudaExtraAtalhos').style.display = "flex";
  }
}
function fecharPopUp() {
  if (popUpAberto === 'ajuda') {
    document.getElementsByClassName('modal-ajuda').style.display = "none";
  } else if (popUpAberto === 'destrutiva') {
    document.getElementsByClassName('modal').style.display = "none";
  } 
}
