<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        // Redirigimos al usuario a la página de autenticación de Google
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Buscamos o creamos un usuario en la base de datos basado en el correo electrónico de Google
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'email_verified_at' => now()
            ]
        );

        // Generamos el token
        $token = $user->createToken('auth_token')->plainTextToken;
        // Redirigimos al usuario al frontend con el token y el nombre como parámetros
        $frontendUrl = "http://localhost:62994/dashboard.html";
        // Construimos la URL final con el token y el nombre del usuario
        $urlFinal = $frontendUrl . "?token=" . $token . "&name=" . urlencode($user->name);

        return redirect($urlFinal);
    }
}
