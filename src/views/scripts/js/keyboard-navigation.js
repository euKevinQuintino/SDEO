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
