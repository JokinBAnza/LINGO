<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
<style>/* --- RESET Y BASE --- */
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
.py-12 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.max-w-7xl {
  width: 90%;
  max-width: 700px;
}

.bg-white {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffcc00;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

/* --- CONTENIDO INTERNO --- */
.p-6 {
  padding: 2rem;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
}

.text-gray-900 {
  color: #fff !important;
}

/* --- ANIMACIÓN SUAVE --- */
.bg-white {
  transition: transform 0.3s ease;
}

.bg-white:hover {
  transform: scale(1.02);
}

/* --- RESPONSIVE --- */
@media (max-width: 600px) {
  header h2 {
    font-size: 1.8rem;
  }

  .p-6 {
    font-size: 1.1rem;
    padding: 1.5rem;
  }
}
</style>