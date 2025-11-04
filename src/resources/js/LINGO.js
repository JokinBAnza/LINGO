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

let intervalo = setInterval(() => {
  if (juegoTerminado) return;
  tiempoRestante--;
  if (tiempoRestante < 0) tiempoRestante = 0;
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
      const mensajeDiv = document.getElementById("mensajeFinal");
      mensajeDiv.innerHTML = `
    <h2 style="color:lime; text-align:center; font-size:28px;">
      ¡Enhorabuena!
    </h2>
    <p style="text-align:center; color:green; font-size:20px;">
      Has resuelto la palabra en <strong>${tiempoTotal} segundos</strong>.
    </p>
  `;
      return;
    }

    // preparamos siguiente fila
    palabra = "";
    contPalabra = 0;
    filaActual++;
    reiniciarContador();
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
