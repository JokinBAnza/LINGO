const palabraSecreta = "LINGO";
let contPalabra = 0;
let palabra = "";
const ABECEDARIO = "QWERTYUIOPASDFGHJKLÑ ZXCVBNM";
const N = 5;
let tiempoRestante = 60;
let filaActual = 0;
let juegoTerminado = false;
let tiempoInicio = Date.now();

let contadorElemento = document.getElementById("conta");

function actualizarContador() {
  let minutos = Math.floor(tiempoRestante / 60);
  let segundos = tiempoRestante % 60;
  contadorElemento.textContent =
    `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

//Si se acaba el tiempo
let intervalo = setInterval(() => {
  if (juegoTerminado) return;
  tiempoRestante--;
  if (tiempoRestante <= 0) {
    juegoTerminado = true;
    clearInterval(intervalo);
    window.location.href = `/fallo?palabra=${palabraSecreta}`;
    return;
  }
  actualizarContador();
}, 1000);


function reiniciarContador() {
  tiempoRestante = 60;
  actualizarContador();
}

function tecladoClick(letra, img) {
  if (juegoTerminado) return; // bloqueo tras ganar

  palabra += letra;
  const nuevaImagen = img.cloneNode(true);
  nuevaImagen.style.width = "70px";
  nuevaImagen.style.height = "70px";
  nuevaImagen.style.objectFit = "contain";

  // buscamos la primera celda vacía de la fila actual (mejor que recorrer todo el grid)
  for (let j = 0; j < N; j++) {
    const celda = document.getElementById(`${filaActual}x${j}`);
    if (celda && celda.children.length === 0) {
      celda.appendChild(nuevaImagen);
      contPalabra++;
      break;
    }
  }

  if (contPalabra === N) {
    // PRIMERA CORRECCIÓN: obtener resultado antes de usarlo
    const resultado = verificarPalabra(palabra, palabraSecreta, filaActual);

    // si todas son correctas, acabamos
    if (resultado.every(r => r === "correcta")) {
      juegoTerminado = true;
      clearInterval(intervalo);
      const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
      guardarPartida(tiempoTotal, true);
      window.location.href = `${rutaAcierto}?tiempo=${tiempoTotal}&palabra=${palabraSecreta}`;
      return;

    }

    // preparamos siguiente fila
    palabra = "";
    contPalabra = 0;
    filaActual++;
    reiniciarContador();

    //Si fallo los 5 intentos
    if (filaActual >= 5) {
      juegoTerminado = true;
      clearInterval(intervalo);
      const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
      guardarPartida(tiempoTotal, false);
      window.location.href = `/fallo?palabra=${palabraSecreta}`;
      return;
    }

  }
}

function verificarPalabra(palabra, palabraSecreta, fila) {
  palabra = palabra.toUpperCase();
  palabraSecreta = palabraSecreta.toUpperCase();

  const resultado = Array(palabra.length).fill("incorrecta");
  const letrasPendientes = palabraSecreta.split("");

  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] === palabraSecreta[i]) {
      resultado[i] = "correcta";
      letrasPendientes[i] = null;
    }
  }

  for (let i = 0; i < palabra.length; i++) {
    if (resultado[i] === "correcta") continue;
    const index = letrasPendientes.indexOf(palabra[i]);
    if (index !== -1) {
      resultado[i] = "existe";
      letrasPendientes[index] = null;
    }
  }

  for (let i = 0; i < palabra.length; i++) {
    const celda = document.getElementById(`${fila}x${i}`);
    if (!celda) continue;
    const img = celda.querySelector("img");
    if (!img) continue;

    if (resultado[i] === "correcta") {
      img.src = `Recursos/LetrasVerdes/${palabra[i]}.gif`;
    } else if (resultado[i] === "existe") {
      img.src = `Recursos/LetrasNaranjas/${palabra[i]}.png`;
    } else {
      img.src = `Recursos/LetrasRojas/LetrasRojas${palabra[i]}.gif`;
    }
  }

  return resultado;
}

function guardarPartida(tiempo, ganada) {
  fetch('/partidas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify({
      tiempo: tiempo,
      ganada: ganada  // debe coincidir con el request->validate
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {   // tu controller devuelve 'ok': true
        console.log('Partida guardada correctamente');
      } else {
        console.error('Error al guardar la partida');
      }
    })
    .catch(err => console.error(err));
}


/* código para crear grid y teclado (si ya lo tienes, mantenlo igual) */
const contenedor = document.getElementById("contenedor");
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const celda = document.createElement("div");
    celda.id = `${i}x${j}`;
    contenedor.appendChild(celda);
  }
}

const contenedor2 = document.getElementById("contenedor2");
let contador = 1;
const FILAS = 3;
const COLUMNAS = 10;

for (let i = 0; i < FILAS; i++) {
  for (let j = 0; j < COLUMNAS; j++) {
    const celda = document.createElement("div");
    const img = document.createElement("img");
    img.src = `Recursos/QWERTY2/${contador}.gif`;
    let index = contador;
    img.onclick = () => tecladoClick(ABECEDARIO[index - 1], img);
    celda.appendChild(img);
    contenedor2.appendChild(celda);
    contador++;
  }
}
