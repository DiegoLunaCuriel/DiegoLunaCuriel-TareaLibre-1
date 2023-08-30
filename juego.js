const colores = ["red", "blue", "green", "yellow"];
let secuencia = [];
let secuenciaUsuario = [];
let paso = 0;

function iluminarColor(color) {
  const colorBox = document.querySelector(`[data-color="${color}"]`);
  colorBox.style.opacity = 1;
  setTimeout(() => {
    colorBox.style.opacity = 0.6;
  }, 300);
}

function iniciarJuego() {
  document.getElementById('mensaje').textContent = '';
  document.querySelector('button').disabled = true;
  secuencia = [];
  secuenciaUsuario = [];
  paso = 0;
  agregarPaso();
}

function agregarPaso() {
  const nuevoColor = colores[Math.floor(Math.random() * 4)];
  secuencia.push(nuevoColor);
  ejecutarSecuencia();
}

function ejecutarSecuencia() {
  document.querySelector('button').disabled = true;
  let i = 0;
  const intervalo = setInterval(() => {
    iluminarColor(secuencia[i]);
    i++;
    if (i >= secuencia.length) {
      clearInterval(intervalo);
      document.querySelector('button').disabled = false;
    }
  }, 500);
}

function verificarSecuencia(color) {
  if (color === secuenciaUsuario[paso]) {
    paso++;
    if (paso === secuencia.length) {
      paso = 0;
      secuenciaUsuario = [];
      setTimeout(agregarPaso, 1000);
    }
  } else {
    document.getElementById('mensaje').textContent = '¡Incorrecto! Inténtalo nuevamente.';
    document.querySelector('button').disabled = false;
  }
}

document.querySelectorAll('.color-box').forEach(box => {
  box.addEventListener('click', () => {
    const color = box.getAttribute('data-color');
    secuenciaUsuario.push(color);
    iluminarColor(color);
    verificarSecuencia(color);
  });
});
