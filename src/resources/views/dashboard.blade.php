<x-app-layout>
    <x-slot name="header">
        <header>
            <h2>Dashboard</h2>
        </header>
    </x-slot>

    <div class="contenedor">
        <div class="tarjeta">
            <div class="contenido">
                <p>You're logged in!</p>
                <a href="{{ route('lingo') }}" class="boton-lingo">LINGO</a>
            </div>
        </div>
    </div>
</x-app-layout>

<style>
/* --- RESET Y BASE --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jersey 25", sans-serif;
}

html, body {
  height: 100%;
  background: linear-gradient(135deg, #004aad, #1a1a40);
  color: #fff;
}

/* --- HEADER --- */
header h2 {
  font-size: 2.5rem;
  color: #ffcc00;
  text-shadow: 2px 2px 0 #000;
  text-align: center;
  margin-top: 40px;
}

/* --- CONTENEDOR PRINCIPAL --- */
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.tarjeta {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffcc00;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.tarjeta:hover {
  transform: scale(1.02);
}

/* --- CONTENIDO INTERNO --- */
.contenido {
  padding: 2rem;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
}

.boton-lingo {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 25px;
  background: #ffcc00;
  color: #000;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s;
}

.boton-lingo:hover {
  background: #ffd633;
}

/* --- RESPONSIVE --- */
@media (max-width: 600px) {
  header h2 {
    font-size: 1.8rem;
  }

  .contenido {
    font-size: 1.1rem;
    padding: 1.5rem;
  }
}
</style>
