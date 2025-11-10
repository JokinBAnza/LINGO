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
  @vite(['resources/css/app.css', 'resources/js/app.js'])

  {{-- CSS desde resources --}}
  @vite('resources/css/estilos.css')
</head>

<body>
  <header>
    <div id="headerTitulo">
      <h1>LINGO</h1>
    </div>
    <div id="headerLogo">
      <img id="logo" src="{{ asset('Recursos/LogoLingo.png') }}" alt="LOGO">
    </div>
    @include('layouts.navigation')
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
      <div id="contenedor3">
      <button id="btnTiempo">TIEMPO</button>
        <p id="conta"></p>
      </div>
      <div id="contenedorPunt">
      <button id="btnPuntuacion">PUNTUACIÓN</button>
      <p id="victorias">{{ $puntuacion }} puntos</p>
      <p>(Victorias:+10 puntos)</p>
      <p>(Derrotas: -5 puntos)</p>
      </div>
      <div id="contenedorEst">
      <button id="btnEstadisticas">ESTADÍSTICAS</button>
      <p id="victorias">VICTORIAS:{{ $victorias }}</p>
      <p id="derrotas">DERROTAS:{{ $derrotas }}</p>
      </div>
    </aside>

    <div id="contenedor0">
      <div id="contenedor"></div>
      <div id="contenedor2"></div>
    </div>
  </main>

  <!-- Configuración de rutas para JS -->
  <div id="config" 
       data-ruta-acierto="{{ route('acierto') }}" 
       data-ruta-fallo="{{ route('fallo') }}">
  </div>

  <!-- Luego carga tu JS clásico -->
  <script src="{{ asset('js/LINGO.js') }}"></script>

  <footer>
    <p>&copy; Plaiaundi 2025</p>
  </footer>
</body>

</html>
