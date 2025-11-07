console.log("JS cargado");

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

// Bloqueamos todo hasta que tengamos la palabra
function inicializarJuegoConPalabra(palabra) {
    palabraSecreta = palabra.toUpperCase();
    console.log("Palabra secreta final:", palabraSecreta);
    juegoListo = true;

    iniciarJuego();
}

// Petición a la API
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

// ------------------- FUNCIONES -------------------

function iniciarJuego() {
    actualizarContador();

    // Contador
    let intervalo = setInterval(() => {
        if (juegoTerminado) return;
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            juegoTerminado = true;
            clearInterval(intervalo);
            const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
            window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;


            return;
        }
        actualizarContador();
    }, 1000);

    // Crear grid
    const contenedor = document.getElementById("contenedor");
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const celda = document.createElement("div");
            celda.id = `${i}x${j}`;
            contenedor.appendChild(celda);
        }
    }

    // Crear teclado
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
        // Verificar si la palabra existe en la API
        fetch(`http://185.60.43.155:3000/api/check/${palabra}`)
            .then(res => res.json())
            .then(data => {
                if (!data.exists) {
                    alert(`La palabra "${palabra}" no existe`);
                    // Poner todas las letras en rojo
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

                    if (filaActual >= 5) {
                        juegoTerminado = true;
                        const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                        guardarPartida(tiempoTotal, false);
                        window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
                       
                    }
                     return; // Salimos si palabra no existe
                }

                // Si existe, comprobación normal
                const resultado = verificarPalabra(palabra, palabraSecreta, filaActual);

                if (resultado.every(r => r === "correcta")) {
                    juegoTerminado = true;
                    const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                    guardarPartida(tiempoTotal, true); // se ejecuta en segundo plano
                    window.location.href = `/acierto?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`; // redirige al instante
                    return;
                }


                palabra = "";
                contPalabra = 0;
                filaActual++;
                reiniciarContador();

                if (filaActual >= 5) {
                    juegoTerminado = true;
                    const tiempoTotal = Math.floor((Date.now() - tiempoInicio) / 1000);
                    guardarPartida(tiempoTotal, false)
                    window.location.href = `/fallo?palabra=${palabraSecreta}&tiempo=${tiempoTotal}`;
                    return;
                }
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
