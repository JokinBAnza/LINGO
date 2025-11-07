let contPalabra = 0;
let palabra = "";
const ABECEDARIO = "QWERTYUIOPASDFGHJKLÑ ZXCVBNM";
const N = 5;
let tiempoRestante = 60;
let filaActual = 0;
let juegoTerminado = false;
let juegoListo = false;
let tiempoInicio = Date.now();

let contadorElemento = document.getElementById("conta");
let palabraSecreta = ""; // se asignará desde la API

let intervaloJuego = null; // Control del setInterval
let jugando = false;        // Estado del juego

// ------------------- INICIALIZACIÓN -------------------

function inicializarJuegoConPalabra(palabra) {
    palabraSecreta = palabra.toUpperCase();
    console.log("Palabra secreta final:", palabraSecreta);
    juegoListo = true;

    crearGridYTeclado();
    actualizarContador();
}

// Petición a la API
fetch('http://185.60.43.155:3000/api/word/1')
    .then(res => res.json())
    .then(data => {
        if (data.word && data.word.length === N) {
            inicializarJuegoConPalabra(data.word);
        } else {
            inicializarJuegoConPalabra("LINGO");
        }
    })
    .catch(err => {
        console.error("Error al obtener palabra de la API:", err);
        inicializarJuegoConPalabra("LINGO");
    });

// ------------------- FUNCIONES -------------------

function toggleJuego() {
    if (!juegoListo || juegoTerminado) return;

    if (!jugando) {
        // Iniciar juego
        jugando = true;
        tiempoInicio = Date.now();
        if (tiempoRestante <= 0) tiempoRestante = 60; 
        actualizarContador();

        intervaloJuego = setInterval(() => {
            if (juegoTerminado) return;
            tiempoRestante--;
            if (tiempoRestante <= 0) {
                clearInterval(intervaloJuego);
                juegoTerminado = true;
                const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
                return;
            }
            actualizarContador();
        }, 1000);
    } else {
        // Pausar juego
        jugando = false;
        clearInterval(intervaloJuego);
    }
}

function crearGridYTeclado() {
    // Crear grid
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar grid
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const celda = document.createElement("div");
            celda.id = `${i}x${j}`;
            contenedor.appendChild(celda);
        }
    }

    // Crear teclado
    const contenedor2 = document.getElementById("contenedor2");
    contenedor2.innerHTML = ""; // Limpiar teclado
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

function actualizarContador() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    contadorElemento.textContent =
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function reiniciarContador() {
    tiempoRestante = 60;
    actualizarContador();
}

// ------------------- TECLADO -------------------

function tecladoClick(letra, img) {
    if (juegoTerminado || !juegoListo) return;

    palabra += letra;
    const nuevaImagen = img.cloneNode(true);
    nuevaImagen.style.width = "70%";
    nuevaImagen.style.height = "70%";
    nuevaImagen.style.objectFit = "contain";

    for (let j = 0; j < N; j++) {
        const celda = document.getElementById(`${filaActual}x${j}`);
        if (celda && celda.children.length === 0) {
            celda.appendChild(nuevaImagen);
            contPalabra++;
            break;
        }
    }

    if (contPalabra === N) {
        // Verificar palabra
        fetch(`http://185.60.43.155:3000/api/check/${palabra}`)
            .then(res => res.json())
            .then(data => {
                if (!data.exists) {
                    alert(`La palabra "${palabra}" no existe`);
                    for (let j = 0; j < N; j++) {
                        const celda = document.getElementById(`${filaActual}x${j}`);
                        if (celda && celda.children.length > 0) {
                            const img = celda.querySelector("img");
                            if (img) img.src = `Recursos/LetrasRojas/LetrasRojas${palabra[j]}.gif`;
                        }
                    }
                    palabra = "";
                    contPalabra = 0;
                    filaActual++;
                    reiniciarContador();
                    if (filaActual >= 5) terminarJuego(false);
                    return;
                }

                const resultado = verificarPalabra(palabra, palabraSecreta, filaActual);
                if (resultado.every(r => r === "correcta")) {
                    terminarJuego(true);
                    return;
                }

                palabra = "";
                contPalabra = 0;
                filaActual++;
                reiniciarContador();
                if (filaActual >= 5) terminarJuego(false);
            })
            .catch(err => console.error("Error al verificar la palabra:", err));
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

        if (resultado[i] === "correcta") img.src = `Recursos/LetrasVerdes/${palabra[i]}.gif`;
        else if (resultado[i] === "existe") img.src = `Recursos/LetrasNaranjas/${palabra[i]}.png`;
        else img.src = `Recursos/LetrasRojas/LetrasRojas${palabra[i]}.gif`;
    }

    return resultado;
}

function terminarJuego(ganada) {
    juegoTerminado = true;
    jugando = false;
    clearInterval(intervaloJuego);
    const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
    guardarPartida(tiempoTotal, ganada);
    window.location.href = ganada 
        ? `/acierto?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`
        : `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
}

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
    .then(data => data.ok ? console.log('Partida guardada') : console.error('Error al guardar'))
    .catch(err => console.error(err));
}

// ------------------- BOTÓN JUGAR -------------------
document.getElementById("botonJugar").addEventListener("click", toggleJuego);
