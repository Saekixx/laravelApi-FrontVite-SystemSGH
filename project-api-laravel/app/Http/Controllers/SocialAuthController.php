<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        // Redirigimos al usuario a la página de autenticación de Google
        /** @var \Laravel\Socialite\Two\GoogleProvider $provider */
        $provider = Socialite::driver('google');
        return $provider->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $provider */
        $provider = Socialite::driver('google');
        $googleUser = $provider->stateless()->user();

        // Buscamos o creamos un usuario en la base de datos basado en el correo electrónico de Google
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->user['given_name'],
                'last_name' => $googleUser->user['family_name'],
                'idGoogle' => $googleUser->getId(),
                'email_verified_at' => now()
            ]
        );

        // Generamos el token
        $token = $user->createToken('auth_token')->plainTextToken;
        // Redirigimos al usuario al frontend con el token y el nombre como parámetros
        $frontendUrl = "http://localhost:5173/auth/google/callback";
        // Construimos la URL final con el token y el nombre del usuario
        $urlFinal = $frontendUrl . "?token=" . $token . "&name=" . urlencode($user->name) . "&last_name=" . urlencode($user->last_name) . "&email=" . urlencode($user->email);

        return redirect($urlFinal);
    }
}
