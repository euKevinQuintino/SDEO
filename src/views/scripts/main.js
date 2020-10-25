window.addEventListener("keydown", function (event) {
  if (event.key !== undefined) {
    if (event.key === ' ' || 'Enter') {
      //enter ou espaço
      event.preventDefault();
      document.activeElement.click();
    }
    if (event.key === 'Escape') {
      //esc
      event.preventDefault();
      paraIndex();
    }
    if (event.key === 'F1') {
      //f1
      event.preventDefault();
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