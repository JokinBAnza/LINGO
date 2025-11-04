<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight"></h2>
    </x-slot>
            <!-- Tu HTML de LINGO -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <header>
                    <div id="headerTitulo">
                        <h1>LINGO</h1>
                    </div>
                    <div id="headerLogo">
                        <img id="logo" src="{{ asset('Recursos/Logo LINGO Transparencia.png') }}" alt="Logo LINGO">
                    </div>
                    @vite('resources/css/estilos.css')
                    @vite('resources/js/LINGO.js')
                </header>

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