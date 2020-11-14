const formularioBusca = document.getElementById("formularioBusca");
const formularioCadastro = document.getElementById("formularioCadastro");
const pagina = window.location.pathname;
const socket = io();

//Busca
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
      window.location = "ordem.html" + "?numero=" + numeroOrdem;
    } else if (!sucessoBusca) {
      document.getElementById("PopUpErroBusca").style.display = "flex";
    }
  });
}

//Cadastro
if (pagina == "/cadastro-ordem.html") {
  formularioCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let numeroDigitado = evento.target.elements.numeroCadastro.value;
    if (String(numeroDigitado).length == 0 || numeroDigitado <= 0) {
      document.getElementById("PopUpErroCadastroMaior").style.display = "flex";
    } else if (String(numeroDigitado).length > 4) {
      document.getElementById("PopUpErroCadastroMaior").style.display = "flex";
    } else {
      localStorage.setItem("numeroOrdem", /*JSON.stringify*/ numeroDigitado);
      socket.emit("cadastro", numeroDigitado);
    }
  });
  socket.on("sucessoCadastro", function (sucessoCadastro) {
    if (sucessoCadastro) {
      document.getElementById("PopUpCadastro").style.display = "flex";
    } else if (!sucessoCadastro) {
      document.getElementById("PopUpErroCadastroExiste").style.display = "flex";
    }
  });
}

//Preencher ordem
window.onload = function () {
  let numeroOrdem = localStorage.getItem("numeroOrdem");
  numeroOrdem.replace(/['"]+/g, " ");
  document.getElementById("TituloOrdem").innerHTML = "ordem #" + numeroOrdem;
  //if (pagina == "/cadastro-ordem.html") {}
};
