document.addEventListener('DOMContentLoaded', (e) => {
  const hint = document.querySelector('.hint');
  if (hint) {
    const hintShowButton = document.createElement('BUTTON');
    hintShowButton.textContent = 'Show hint';
    hint.parentNode.insertBefore(hintShowButton, hint);
    hint.style.display = 'none';

    hintShowButton.addEventListener('click', (e) => {
      hint.style.display = '';
      e.target.style.display = 'none';
    })
  }
})