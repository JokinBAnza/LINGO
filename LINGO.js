const palabraSecreta = "LINGO";
    let contPalabra = 0;
    let palabra = "";
    const ABECEDARIO = "QWERTYUIOPASDFGHJKLÑ ZXCVBNM";
    const N = 5;
    let tiempoRestante = 60;
    let filaActual = 0;

    let contadorElemento = document.getElementById("conta");

    function actualizarContador() {
      let minutos = Math.floor(tiempoRestante / 60);
      let segundos = tiempoRestante % 60;
      contadorElemento.textContent =
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    // Intervalo de 1 segundo
    let intervalo = setInterval(() => {
      tiempoRestante--;
      if (tiempoRestante < 0) tiempoRestante = 0; // opcional: detener en 0
      actualizarContador();
    }, 1000);

    // Reiniciar el contador al completar una línea
    function reiniciarContador() {
      tiempoRestante = 60;
      actualizarContador();
    }
    // Función para manejar clicks del teclado
    function tecladoClick(letra, img) {
      palabra += letra;

      // Clonamos la imagen para colocarla en el grid
      const nuevaImagen = img.cloneNode(true);
      nuevaImagen.style.width = "70px";
      nuevaImagen.style.height = "70px";
      nuevaImagen.style.objectFit = "contain";

      // Buscar la primera celda vacía
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const celda = document.getElementById(`${i}x${j}`);
          if (celda.children.length === 0) {
            celda.appendChild(nuevaImagen);
            contPalabra++;
            if (contPalabra === N) { // N = 5
              verificarPalabra(palabra, palabraSecreta, filaActual);

              // Preparar para la siguiente línea
              palabra = "";
              contPalabra = 0;
              filaActual++; // pasamos a la siguiente fila
              reiniciarContador();
            }

            return;
          }
        }
      }
    }
    function verificarPalabra(palabra, palabraSecreta, fila) {
      palabra = palabra.toUpperCase();
      palabraSecreta = palabraSecreta.toUpperCase();

      const resultado = Array(palabra.length).fill("incorrecta");
      const letrasPendientes = palabraSecreta.split("");

      // 1️⃣ Letras correctas en la posición
      for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === palabraSecreta[i]) {
          resultado[i] = "correcta";
          letrasPendientes[i] = null; // letra usada
        }
      }

      // 2️⃣ Letras que existen pero en otra posición
      for (let i = 0; i < palabra.length; i++) {
        if (resultado[i] === "correcta") continue;
        const index = letrasPendientes.indexOf(palabra[i]);
        if (index !== -1) {
          resultado[i] = "existe";
          letrasPendientes[index] = null;
        }
      }

      // 3️⃣ Cambiar imágenes según el estado
      for (let i = 0; i < palabra.length; i++) {
        const celda = document.getElementById(`${fila}x${i}`);
        if (!celda) continue;

        const img = celda.querySelector("img");
        if (!img) continue;

        if (resultado[i] === "correcta") {
          img.src = `Recursos/QWERTY2/${palabra[i]}.gif`;
        } else if (resultado[i] === "existe") {
          img.src = `Recursos/LETRAS/naranja/${palabra[i]}.gif`;
        } else {
          img.src = `Recursos/LetrasRojas/LetrasRojas${palabra[i]}.gif`;
        }
      }

      return resultado;
    }


    // Crear grid principal (5x5)
    const contenedor = document.getElementById("contenedor");
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const celda = document.createElement("div");
        celda.id = `${i}x${j}`;
        contenedor.appendChild(celda);
      }
    }

    // Crear teclado (10x3)
    const contenedor2 = document.getElementById("contenedor2");
    let contador = 1;
    const FILAS = 3;
    const COLUMNAS = 10;

    for (let i = 0; i < FILAS; i++) {
      for (let j = 0; j < COLUMNAS; j++) {
        const celda = document.createElement("div");

        const img = document.createElement("img");
        img.src = `Recursos/QWERTY2/${contador}.gif`;

        // Guardar el índice local para cada closure
        let index = contador;
        img.onclick = () => tecladoClick(ABECEDARIO[index - 1], img);

        celda.appendChild(img);
        contenedor2.appendChild(celda);
        contador++;
      }
    }