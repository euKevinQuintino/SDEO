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

var isPainelAjudaAberto = false;
var isGuiaAberto = false;

function paraIndex() {
  window.location = 'index.html';
}

function paraCadastroOrdem() {
  window.location = 'cadastro-ordem.html';
}

function abrirPainelAjuda() {
  if (isPainelAjudaAberto) {
    if (isGuiaAberto) {
      document.getElementById('AjudaCadastro').style.display = 'none';
      document.getElementById('AjudaConsulta').style.display = 'none';
      document.getElementById('AjudaAlteracao').style.display = 'none';
      document.getElementById('AjudaAdicaoImagem').style.display = 'none';
      document.getElementById('AjudaRemocaoImagem').style.display = 'none';
      document.getElementById('AjudaExtra').style.display = 'none';
      document.querySelector('.modal-ajuda__content__items').style.display = 'block';
      document.querySelector('.modal-ajuda').style.display = 'flex';
      isGuiaAberto = false;
    }
  } else {
    document.querySelector('.modal-ajuda').style.display = 'flex';
    document.querySelector('.modal-ajuda__content__items').style.display = 'block';
  }
  isPainelAjudaAberto = true;
}

function abrirItemAjuda(item) {
  if (item == 'consulta') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaConsulta').style.display = 'block';
    isGuiaAberto = true;
  } else if (item == 'cadastro') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaCadastro').style.display = 'block';
    isGuiaAberto = true;
  } else if (item == 'alteracao') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaAlteracao').style.display = 'block';
    isGuiaAberto = true;
  } else if (item == 'adicaoImagem') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaAdicaoImagem').style.display = 'block';
    isGuiaAberto = true;
  } else if (item == 'remocaoImagem') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaRemocaoImagem').style.display = 'block';
    isGuiaAberto = true;
  } else if (item == 'extra') {
    document.querySelector('.modal-ajuda__content__items').style.display = 'none';
    document.getElementById('AjudaExtra').style.display = 'block';
    isGuiaAberto = true;
  }
}

function fecharPopUp() {
  if (isPainelAjudaAberto) {
    document.querySelector('.modal-ajuda').style.display = 'none';
    /*document.getElementById('AjudaCadastro').style.display = 'none';
    document.getElementById('AjudaConsulta').style.display = 'none';
    document.getElementById('AjudaAlteracao').style.display = 'none';
    document.getElementById('AjudaAdicaoImagem').style.display = 'none';
    document.getElementById('AjudaRemocaoImagem').style.display = 'none';
    document.getElementById('AjudaExtra').style.display = 'none';*/
    isPainelAjudaAberto = false;
    //isGuiaAberto = false;
  } /*else if (popUpAberto == 'destrutiva') {
    document.gquerySelector('.modal').style.display = 'none';
  }*/
}
