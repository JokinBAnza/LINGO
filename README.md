# LINGO GAME

**LINGO** es un divertido juego de palabras en el que el jugador debe adivinar la palabra secreta en un número limitado de intentos. Este proyecto está desarrollado con HTML, CSS y JavaScript, y con PHP/MySQL para gestionar login, registro y puntuaciones.

---

## 🕹️ Cómo jugar

1. Regístrate o inicia sesión.  
2. El juego selecciona una palabra secreta aleatoria.  
3. Introduce tu intento en el campo de texto.  
4. Cada letra se marcará según corresponda:  
   - ✅ Letra correcta en la posición correcta (color VERDE).  
   - ⚠️ Letra correcta pero en la posición incorrecta (color NARANJA).  
   - ❌ Letra no está en la palabra (color ROJO).
   - ❌ Si la palabra escrita no existe, toda la fila aparecerá sin pista, de color ROJO.
5. Continúa hasta adivinar la palabra o agotar los intentos.

---

## Framework
- Laravel (backend con login, registro y puntuaciones)

## 💻 Tecnologías
- HTML5
- CSS3
- JavaScript
- PHP y MySQL

---

## 🚀 Instalación y despliegue

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/JokinBAnza/LINGO.git
cd LINGO

2️⃣ Configuración del backend

Instala dependencias de PHP con Composer:

composer install


Crea el archivo .env a partir del ejemplo:

cp .env.example .env


y configura tus credenciales de base de datos.

Ejecuta las migraciones para crear las tablas necesarias:

php artisan migrate


(Opcional) Genera la clave de aplicación Laravel:

php artisan key:generate

3️⃣ Servir la aplicación localmente
php artisan serve


Esto levantará el servidor en http://127.0.0.1:8000.

4️⃣ Despliegue en producción

Sube los archivos a cualquier hosting que soporte PHP y MySQL.

Configura correctamente la base de datos en .env.

Asegúrate de ejecutar composer install en el servidor y las migraciones con php artisan migrate.

📂 Estructura del proyecto
LINGO/
├─ src/             # Código fuente del juego y backend (controladores, vistas, assets)
│  ├─ public/       # Archivos accesibles públicamente (HTML, CSS, JS)
│  ├─ resources/    # Templates y vistas
│  ├─ app/          # Controladores, modelos y lógica de Laravel
│  └─ database/     # Migraciones y seeds
├─ .env             # Configuración de entorno
└─ composer.json    # Dependencias de PHP

💡 Mejoras futuras

Sistema de puntuaciones por usuario más completo.

Diccionario más amplio de palabras secretas.

Modo multijugador en tiempo real.

**AVISO** NAVEGADOR RECOMENDABLE: MOZILLA FIREFOX. (CHROME puede dar problemas en el CSS).
