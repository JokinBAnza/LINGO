<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Has ganado!</title>
  <style>
    body {
      background-color: black;
      color: lime;
      text-align: center;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.5rem;
      margin: 0.5rem 0;
      word-wrap: break-word;
    }

    a {
      color: white;
      font-size: 1.2rem;
      text-decoration: none;
      border: 2px solid lime;
      border-radius: 8px;
      padding: 10px 20px;
      margin-top: 20px;
      transition: 0.3s;
    }

    a:hover {
      background-color: lime;
      color: black;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.2rem;
      }

      a {
        font-size: 1rem;
        padding: 8px 16px;
      }
    }
  </style>
</head>
<body>
  <h1>¡Enhorabuena!</h1>
  <p id="mensaje"></p>
  <p id="palabra"></p>
  <a href="{{ route('lingo') }}">Volver a jugar</a>
  <a href="{{ route('partidas.index') }}" style="margin-top: 10px; display: inline-block; padding: 10px 20px; font-size: 1.2rem; border-radius: 8px; border: 2px solid lime; background: black; color: lime; text-decoration: none;">
    Ranking
</a>


  <script>
    const params = new URLSearchParams(window.location.search);
    const tiempo = params.get("tiempo");
    const palabra = params.get("palabra");
    document.getElementById("mensaje").textContent =
      `Has resuelto la palabra en ${tiempo} segundos.`;
    document.getElementById("palabra").textContent =
      `La palabra era: ${palabra}`;
  </script>
</body>
</html>
