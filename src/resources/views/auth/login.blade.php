<x-guest-layout>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Jersey 25', sans-serif;
            background: linear-gradient(135deg, #063df5ff, #f9fafb);
            margin: 0;

        }

        .login-container {
            text-align: center;
            width: 90%;
            max-width: 400px;
            padding: 2rem 2.5rem;
            background-color: white;
            border-radius: 1.25rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            margin: 0 auto;
        }

        h1 {
            font-size: 3rem;
            color: #111827;
            margin-bottom: 2rem;
        }

        form div {
            margin-bottom: 1rem;
            text-align: left;
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid #d1d5db;
            font-size: 1rem;
            font-family: 'Jersey 25', sans-serif;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        .remember-me {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            color: #4b5563;
        }

        .btn-login {
            width: 100%;
            padding: 0.75rem;
            font-size: 1.25rem;
            font-weight: bold;
            color: white;
            background-color: #4f46e5;
            /* indigo */
            border: none;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.2s;
            margin-top: 1rem;
        }

        .btn-login:hover {
            background-color: #4338ca;
            transform: translateY(-2px);
        }

        .forgot-password {
            display: block;
            margin-top: 0.5rem;
            text-align: right;
            font-size: 0.9rem;
            color: #6b7280;
            text-decoration: underline;
        }

        .forgot-password:hover {
            color: #4b5563;
        }

        @media (max-width: 480px) {
            h1 {
                font-size: 2.2rem;
            }

            .btn-login {
                font-size: 1rem;
                padding: 0.6rem;
            }

            .login-container {
                padding: 1.5rem 2rem;
                background-color: #004099;
            }
        }
    </style>

    <div class="login-container">
        <h1>Login</h1>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>

            <!-- Password -->
            <div>
                <x-input-label for="password" :value="__('Password')" />
                <x-text-input id="password" type="password" name="password" required autocomplete="current-password" />
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <!-- Remember Me -->
            <div class="remember-me">
                <input id="remember_me" type="checkbox" name="remember" class="me-2">
                <label for="remember_me">{{ __('Remember me') }}</label>
            </div>

            <!-- Forgot Password -->
            @if (Route::has('password.request'))
            <a class="forgot-password" href="{{ route('password.request') }}">
                {{ __('Forgot your password?') }}
            </a>
            @endif

            <!-- Login Button -->
            <button type="submit" class="btn-login">
                {{ __('Log in') }}
            </button>
        </form>
    </div>
</x-guest-layout>