console.log("JS cargado");

// ------------------- VARIABLES GLOBALES -------------------
let contPalabra = 0;           // Contador de letras escritas en la fila actual
let palabra = "";              // Palabra que se va formando
const ABECEDARIO = "QWERTYUIOPASDFGHJKLÑ ZXCVBNM"; // Letras disponibles
const N = 5;                    // Número de letras por palabra
let tiempoRestante = 60;       // Tiempo por intento
let filaActual = 0;            // Fila actual del grid
let juegoTerminado = false;    // Flag para saber si el juego terminó
let juegoListo = false;        // Flag para saber si la palabra ya está lista
let tiempoInicio = Date.now(); // Tiempo de inicio del juego

let contadorElemento = document.getElementById("conta"); // Elemento DOM del contador
let palabraSecreta = ""; // Palabra secreta que se obtiene de la API

// ------------------- INICIALIZACIÓN -------------------

// Función para inicializar el juego con la palabra de la API
function inicializarJuegoConPalabra(palabra) {
    palabraSecreta = palabra.toUpperCase();
    console.log("Palabra secreta final:", palabraSecreta);
    juegoListo = true;
    iniciarJuego();
}

// Petición a la API para obtener la palabra
fetch('http://185.60.43.155:3000/api/word/1')
    .then(res => res.json())
    .then(data => {
        console.log("Datos API:", data);
        if (data.word && data.word.length === N) {
            inicializarJuegoConPalabra(data.word);
        } else {
            console.warn("API devolvió palabra inválida, usamos LINGO");
            inicializarJuegoConPalabra("LINGO");
        }
    })
    .catch(err => {
        console.error("Error al obtener palabra de la API:", err);
        inicializarJuegoConPalabra("LINGO");
    });

// ------------------- FUNCIONES PRINCIPALES -------------------

function iniciarJuego() {
    actualizarContador(); // Mostrar contador inicial

    // Contador de tiempo
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

    // Crear grid de celdas
    const contenedor = document.getElementById("contenedor");
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const celda = document.createElement("div");
            celda.id = `${i}x${j}`;
            contenedor.appendChild(celda);
        }
    }

    // Crear teclado visual
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
}

// Actualiza el contador visual
function actualizarContador() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    contadorElemento.textContent =
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Reinicia el contador cuando el jugador pasa de fila
function reiniciarContador() {
    tiempoRestante = 60;
    actualizarContador();
}

// Maneja los clicks en el teclado
function tecladoClick(letra, img) {
    if (juegoTerminado || !juegoListo) return;

    palabra += letra;

    // Clona la imagen para ponerla en la celda
    const nuevaImagen = img.cloneNode(true);
    nuevaImagen.style.width = "70px";
    nuevaImagen.style.height = "70px";
    nuevaImagen.style.objectFit = "contain";

    // Inserta la letra en la primera celda libre de la fila
    for (let j = 0; j < N; j++) {
        const celda = document.getElementById(`${filaActual}x${j}`);
        if (celda && celda.children.length === 0) {
            celda.appendChild(nuevaImagen);
            contPalabra++;
            break;
        }
    }

    // Cuando se completa la fila
    if (contPalabra === N) {
        const resultado = verificarPalabra(palabra, palabraSecreta, filaActual);

        if (resultado.every(r => r === "correcta")) { // Ganó
            juegoTerminado = true;
            const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
            guardarPartida(tiempoTotal, true)
                .finally(() => window.location.href = `/acierto?palabra=${palabraSecreta}`);
            return;
        }

        // Preparar siguiente intento
        palabra = "";
        contPalabra = 0;
        filaActual++;
        reiniciarContador();

        if (filaActual >= 5) { // Perdió
            juegoTerminado = true;
            const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
            guardarPartida(tiempoTotal, false)
                .finally(() => window.location.href = `/fallo?palabra=${palabraSecreta}`);
            return;
        }
    }
}

// Verifica cada letra de la palabra ingresada
function verificarPalabra(palabra, palabraSecreta, fila) {
    palabra = palabra.toUpperCase();
    palabraSecreta = palabraSecreta.toUpperCase();

    const resultado = Array(palabra.length).fill("incorrecta");
    const letrasPendientes = palabraSecreta.split("");

    // Primero letras correctas en posición
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === palabraSecreta[i]) {
            resultado[i] = "correcta";
            letrasPendientes[i] = null;
        }
    }

    // Luego letras existentes pero en posición incorrecta
    for (let i = 0; i < palabra.length; i++) {
        if (resultado[i] === "correcta") continue;
        const index = letrasPendientes.indexOf(palabra[i]);
        if (index !== -1) {
            resultado[i] = "existe";
            letrasPendientes[index] = null;
        }
    }

    // Actualiza colores de las imágenes según resultado
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

// Guardar partida en backend
function guardarPartida(tiempo, ganada) {
    return fetch('/partidas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ tiempo, ganada })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) console.log('Partida guardada correctamente');
        else console.error('Error al guardar la partida');
    })
    .catch(err => console.error(err));
}
