<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a LINGO</title>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Jersey 25', sans-serif;
            background-color: #f9fafb;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            text-align: center;
        }
        h1 {
            font-size: 5rem;
            color: #111827;
            margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
            h1 {
                font-size: 3rem; /* más pequeño en tablet/móvil */
            }
            .btn {
                font-size: 1rem;
                padding: 0.5rem 1rem;
                display: block; /* apila botones verticalmente */
                margin: 0.5rem auto;
            }
        }

        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            margin: 0.5rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: white;
            background-color: #4f46e5; /* indigo */
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.2s;
        }
        .btn:hover {
            background-color: #4338ca;
        }
        .btn-secondary {
            background-color: #6b7280; /* gray */
        }
        .btn-secondary:hover {
            background-color: #4b5563;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenido a LINGO</h1>
        <div>
            <a href="{{ route('register') }}" class="btn">Register</a>
            <a href="{{ route('login') }}" class="btn btn-secondary">Login</a>
        </div>
    </div>
</body>
</html>
