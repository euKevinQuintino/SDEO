var acc = document.getElementsByClassName("system__guides__option");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

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

var isOpen = false;

function abrirItemAjuda(item) {
  if (isOpen) {
    document.getElementById("dropDownCadastro").style.transition = ".2s";
    document.getElementById("dropDownCadastro").style.transform = "rotate(0deg)";
    document.getElementById("dropDownConsulta").style.transition = ".2s";
    document.getElementById("dropDownConsulta").style.transform = "rotate(0deg)";
    document.getElementById("dropDownEdicao").style.transition = ".2s";
    document.getElementById("dropDownEdicao").style.transform = "rotate(0deg)";
    document.getElementById("dropDownAdicao").style.transition = ".2s";
    document.getElementById("dropDownAdicao").style.transform = "rotate(0deg)";
    document.getElementById("dropDownRemocao").style.transition = ".2s";
    document.getElementById("dropDownRemocao").style.transform = "rotate(0deg)";
    isOpen = false;
  } else if (item == 1 && !isOpen) {
    document.getElementById("dropDownCadastro").style.transition = ".2s";
    document.getElementById("dropDownCadastro").style.transform = "rotate(180deg)";
    isOpen = true;
  } else if (item == 2 && !isOpen) {
    document.getElementById("dropDownConsulta").style.transition = ".2s";
    document.getElementById("dropDownConsulta").style.transform = "rotate(180deg)";
    isOpen = true;
  } else if (item == 3 && !isOpen) {
    document.getElementById("dropDownEdicao").style.transition = ".2s";
    document.getElementById("dropDownEdicao").style.transform = "rotate(180deg)";
    isOpen = true;
  } else if (item == 4 && !isOpen) {
    document.getElementById("dropDownAdicao").style.transition = ".2s";
    document.getElementById("dropDownAdicao").style.transform = "rotate(180deg)";
    isOpen = true;
  } else if (item == 5 && !isOpen) {
    document.getElementById("dropDownRemocao").style.transition = ".2s";
    document.getElementById("dropDownRemocao").style.transform = "rotate(180deg)";
    isOpen = true;
  }
}

function paraIndex() {
    window.location="index.html";
}
function paraCadastroOrdem() {
    window.location="cadastro-ordem.html";
}
function paraPainelAjuda() {
    window.location="painel-ajuda.html";
}
function fecharPopUp() {

}