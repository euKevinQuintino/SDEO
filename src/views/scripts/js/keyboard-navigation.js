window.addEventListener("keydown", function (event) {
  if (event.key !== undefined) {
    if (event.key === ' ' || 'Enter') {
      //enter ou espaço
      //event.preventDefault();
      document.activeElement.click();
    }
    if (event.key === 'Escape') {
      //esc
      //event.preventDefault();
      paraIndex();
    }
    if (event.key === 'F1') {
      //f1
      //event.preventDefault();
      paraPainelAjuda();
    }
  }
});
