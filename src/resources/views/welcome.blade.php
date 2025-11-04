<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LINGO</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet">
</head>

<body>
  <header>
    <div id="headerTitulo">
      <h1>LINGO</h1>
    </div>
    <div id="headerLogo">
      <img id="logo" src="Recursos/Logo LINGO Transparencia.png" alt="">
    </div>
  @vite('resources/css/estilos.css')
  @vite('resources/js/LINGO.js')
  </header>
  <nav>
    <div id="divNav">
      <button id="botonJugar">JUGAR</button>
      <button id="botonIdioma">IDIOMA</button>
      <button id="botonOpciones">OPCIONES</button>
      <button id="botonRanking">RANKING</button>
    </div>

  </nav>
  <main>
    <div id="contenedor"></div>
    <div id="mensajeFinal"></div>
    <div id="contenedor2"></div>
    <div id="contenedor3">
      <h3 id="tiempo">Tiempo:</h3>
      <p id="conta"></p>
    </div>
  </main>
  <footer>
    <p>&copy; Plaiaundi 2025</p>

  </footer>
</body>

</html>