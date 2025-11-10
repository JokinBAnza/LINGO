<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking de Partidas</title>
    <style>
        body { background-color: black; color: lime; font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        table { border-collapse: collapse; margin: auto; width: 80%; }
        th, td { border: 1px solid lime; padding: 10px; }
        th { background-color: lime; color: black; }
        a { color: lime; text-decoration: none; margin-top: 20px; display: inline-block; border: 2px solid lime; border-radius: 8px; padding: 10px 20px; }
        a:hover { background-color: lime; color: black; }
    </style>
</head>
<body>
    <h1>Ranking de Partidas</h1>
    <table>
        <thead>
            <tr>
                <th>Jugador</th>
                <th>Tiempo (s)</th>
                <th>Ganada</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($partidas as $partida)
                <tr>
                    <td>{{ $partida->jugador }}</td>
                    <td>{{ $partida->tiempo }}</td>
                    <td>{{ $partida->ganada ? 'Sí' : 'No' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <a href="{{ route('lingo') }}">Volver al juego</a>
</body>
</html>
