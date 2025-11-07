<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet">

    <!-- CSS y JS propios -->
     @vite('resources/css/estilos.css')
</head>
<body style="font-family: 'Jersey 25', sans-serif; background-color: #004099; margin:0;">

    <div class="layout-container" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; padding-top:1.5rem;">

        <div>
            <a href="/">
                <img src="{{ asset('Recursos/LogoLingo.png') }}" alt="Mi Logo" id="logo" style="width:150px; height:auto;">

            </a>
        </div>

        <div class="content-container" style="width:90%; max-width:400px; margin-top:1.5rem; padding:2rem; background-color:white; border-radius:1rem; box-shadow:0 8px 24px rgba(0,0,0,0.1);">
            {{ $slot }}
        </div>

    </div>

</body>
</html>
