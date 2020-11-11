var i = 0;
var numeroOrdem = 0;

function BuscarOrdem(i) {
  i = document.getElementById("inputBusca").value;
  localStorage.setItem("id", JSON.stringify(i));
  window.location = "ordem.html" + "?id=" + i;
  numeroOrdem = i;
}

window.onload = function() { 
  PreencherOrdem(numeroOrdem);
}

function PreencherOrdem(numeroOrdem) {
  numeroOrdem = localStorage.getItem("id");
  numeroOrdem.replace(/['"]+/g, ' ');
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
}

function AbrirPopUpCadastro() {
  document.getElementById("PopUpCadastro").style.display = "block";
}

function AbrirPopUpRemocao() {
  document.getElementById("PopUpRemocao").style.display = "block";
}

