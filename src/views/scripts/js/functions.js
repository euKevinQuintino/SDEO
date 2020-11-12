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
