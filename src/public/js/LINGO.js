console.log("JS cargado");

// ------------------- VARIABLES -------------------
let contPalabra = 0;
let palabra = "";
const ABECEDARIO = "QWERTYUIOPASDFGHJKLÑ ZXCVBNM";
const N = 5;

let filaActual = 0;
let juegoTerminado = false;
let juegoListo = false;

let tiempoRestante = 60;
let tiempoInicio = Date.now();
let timerInterval = null;
let tiempoPausado = true; // empieza pausado

let contadorElemento = document.getElementById("conta");
let palabraSecreta = "";
let palabrasValidas = [];

// ------------------- INICIALIZAR -------------------
function inicializarJuegoConPalabra(palabra, lista = []) {
    palabraSecreta = palabra.toUpperCase();
    palabrasValidas = lista.length ? lista.map(w => w.toUpperCase()) : [palabraSecreta];
    console.log("Palabra secreta:", palabraSecreta);
    console.log("Palabras válidas:", palabrasValidas);
    juegoListo = true;

    crearGrid();
    crearTeclado();
}

// Petición API
fetch('http://185.60.43.155:3000/api/word/1')
    .then(res => res.json())
    .then(data => {
        if (data.word && data.word.length === N) {
            inicializarJuegoConPalabra(data.word, data.listaPalabras || []);
        } else {
            inicializarJuegoConPalabra("LINGO");
        }
    })
    .catch(() => inicializarJuegoConPalabra("LINGO"));

// ------------------- BOTÓN JUGAR -------------------
document.getElementById("botonJugar").addEventListener("click", () => {
    if (!juegoListo || juegoTerminado) return;

    tiempoPausado = !tiempoPausado; // alterna pausa/reanudar

     botonJugar.textContent = tiempoPausado ? "JUGAR" : "PARAR";

    if (!timerInterval) {
        tiempoInicio = Date.now();
        timerInterval = setInterval(() => {
            if (juegoTerminado) return;

            if (!tiempoPausado) {
                tiempoRestante--;
                if (tiempoRestante <= 0) {
                    juegoTerminado = true;
                    clearInterval(timerInterval);
                    const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                    window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
                    return;
                }
                actualizarContador();
            }
        }, 1000);
    }
});
// ------------------- CONTADOR -------------------
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

// ------------------- GRID -------------------
function crearGrid() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const celda = document.createElement("div");
            celda.id = `${i}x${j}`;
            contenedor.appendChild(celda);
        }
    }
}

// ------------------- TECLADO -------------------
function crearTeclado() {
    const contenedor2 = document.getElementById("contenedor2");
    contenedor2.innerHTML = "";
    let contador = 1;
    const FILAS_T = 3;
    const COLUMNAS_T = 10;

    for (let i = 0; i < FILAS_T; i++) {
        for (let j = 0; j < COLUMNAS_T; j++) {
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

// ------------------- FUNCIONES DEL JUEGO -------------------
function tecladoClick(letra, img) {
    if (juegoTerminado || !juegoListo || tiempoPausado) return;

    palabra += letra;

    for (let j = 0; j < N; j++) {
        const celda = document.getElementById(`${filaActual}x${j}`);
        if (celda && celda.children.length === 0) {
            const nuevaImagen = img.cloneNode(true);
            nuevaImagen.style.width = "70px";
            nuevaImagen.style.height = "70px";
            nuevaImagen.style.objectFit = "contain";
            celda.appendChild(nuevaImagen);
            contPalabra++;
            break;
        }
    }

    if (contPalabra === N) {
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
                    siguienteFila(false);
                    return;
                }

                const resultado = verificarPalabra(palabra, palabraSecreta, filaActual);

                if (resultado.every(r => r === "correcta")) {
                    juegoTerminado = true;
                    const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                    guardarPartida(tiempoTotal, true);
                    window.location.href = `/acierto?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
                    return;
                }

                siguienteFila(true);
            })
            .catch(err => console.error("Error al verificar palabra:", err));
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

function siguienteFila(continua) {
    palabra = "";
    contPalabra = 0;
    filaActual++;
    reiniciarContador();

    if (filaActual >= N) {
        juegoTerminado = true;
        const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
        guardarPartida(tiempoTotal, false);
        window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
    }
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
        .then(data => {
            if (data.ok) console.log('Partida guardada correctamente');
            else console.error('Error al guardar la partida');
        })
        .catch(err => console.error(err));
}
function botonRanking(){
    document.getElementById("botonRanking").addEventListener("click", () => {
        window.location.href = '/partidas';
    });
}
botonRanking();
