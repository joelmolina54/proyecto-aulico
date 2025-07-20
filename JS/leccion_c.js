let audioActual = null;
let botonActual = null;

function toggleAudio(boton, src) {
  const textoSpan = boton.querySelector('.sonido-texto');

  if (audioActual && boton === botonActual) {
    if (!audioActual.paused) {
      audioActual.pause();
      boton.classList.remove('reproduciendo');
      textoSpan.textContent = 'Escuchar';
    } else {
      audioActual.play();
      boton.classList.add('reproduciendo');
      textoSpan.textContent = 'Pausar';
    }
    return;
  }

  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
    if (botonActual) {
      botonActual.classList.remove('reproduciendo');
      botonActual.querySelector('.sonido-texto').textContent = 'Escuchar';
    }
  }

  const nuevoAudio = new Audio(src);
  audioActual = nuevoAudio;
  botonActual = boton;

  boton.classList.add('reproduciendo');
  textoSpan.textContent = 'Pausar';
  nuevoAudio.play();

  nuevoAudio.addEventListener('ended', () => {
    boton.classList.remove('reproduciendo');
    textoSpan.textContent = 'Escuchar';
    audioActual = null;
    botonActual = null;
  });
}
