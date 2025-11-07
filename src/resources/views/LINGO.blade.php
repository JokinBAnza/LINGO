<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LINGO</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet">

  {{-- CSS desde resources --}}
  @vite('resources/css/estilos.css')
  <!--<link rel="stylesheet" href="{{ asset('css/estilos.css') }}">-->

</head>

<body>
  <header>
    <div id="headerTitulo">
      <h1>LINGO</h1>
    </div>
    <div id="headerLogo">
      <img id="logo" src="{{ asset('Recursos/LogoLingo.png') }}" alt="LOGO">
    </div>
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
    <aside id="panelLateral">
      <button id="btnTiempo">TIEMPO</button>
      <button id="btnPuntuacion">PUNTUACIÓN</button>
      <button id="btnEstadisticas">ESTADÍSTICAS</button>
    </aside>

    <div id="contenedor0">
      <div id="contenedor"></div>
      <div id="contenedor2"></div>
      <div id="contenedor3">
        <h3 id="tiempo">Tiempo:</h3>
        <p id="conta"></p>
      </div>
    </div>
  </main>

  <footer>
    <p>&copy; Plaiaundi 2025</p>
  </footer>

  <script>
    const rutaAcierto = "{{ route('acierto') }}";
    const rutaFallo = "{{ route('fallo') }}";
</script>
  @vite('resources/js/LINGO.js')
  <!--<script src="{{ asset('js/LINGO.js') }}"></script>-->

</body>

</html>
