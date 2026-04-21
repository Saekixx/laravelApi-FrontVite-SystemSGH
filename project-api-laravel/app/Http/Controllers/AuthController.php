<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Si las credenciales no son válidas, retornamos un error
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        // Si las credenciales son válidas, obtenemos el usuario
        $user = User::where('email', $request->email)->firstOrFail();
        // Creamos un token de autenticación para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'message' => 'Login exitoso',
        ], 200);
    }

    public function register(Request $request)
    {
        // Validamos los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        // Si la validación falla, retornamos los errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creamos el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Encriptamos la contraseña antes de guardarla
        ]);

        // Creamos un token de autenticación para el nuevo usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'message' => 'Usuario registrado exitosamente',
        ], 201);
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user(); // Obtenemos el usuario autenticado

        // Validamos los datos de entrada para la actualización del perfil
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8|confirmed',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Si la validación falla, retornamos los errores
        if ($validator->fails()) return response()->json($validator->errors(), 422);

        // Actualizamos los datos del usuario
        $user->name = $request->name;
        $user->email = $request->email;
        // Si se proporciona una nueva contraseña, la encriptamos antes de guardarla
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        // Si se proporciona un nuevo avatar, lo almacenamos y actualizamos la ruta en el perfil del usuario
        if ($request->hasFile('avatar')) {
            // Borramos el avatar viejo si existe para no llenar el disco
            if ($user->avatar) Storage::disk('public')->delete($user->avatar);
            // Almacenamos el nuevo avatar y guardamos la ruta en el perfil del usuario
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }
        // Guardamos los cambios en la base de datos
        $user->save();

        return response()->json([
            'message' => 'Perfil actualizado exitosamente',
            'user' => $user,
            'avatar_url' => $user->avatar ? asset('storage/' . $user->avatar) : null,
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke el token de autenticación del usuario
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout exitoso']);
    }

    public function resetPasswordLink(Request $request)
    {
        // Validamos el correo exista en la db
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);
        // Si la validación falla, retornamos los errores
        if ($validator->fails()) return response()->json($validator->errors(), 422);
        // Enviamos el enlace de restablecimiento de contraseña al correo proporcionado
        $status = Password::sendResetLink($request->only('email'));

        // Retornamos una respuesta basada en el resultado del envío del enlace de restablecimiento
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Enlace de restablecimiento enviado'], 200)
            : response()->json(['message' => 'Error al enviar el enlace de restablecimiento'], 500);
    }

    public function resetPasswordForm(Request $request, $token)
    {
        // Redirigimos al usuario a la página de restablecimiento de contraseña en el frontend
        $frontendUrl = "http://localhost:5173/reset-password";
        // Construimos la URL final con el token y el correo electrónico del usuario como parámetros
        $urlFinal = $frontendUrl . "?token=" . $token . "&email=" . urlencode($request->email);

        return redirect($urlFinal);
    }

    public function resetPassword(Request $request)
    {
        // Validamos los datos de entrada para el restablecimiento de contraseña
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        // Si la validación falla, retornamos los errores
        if ($validator->fails()) return response()->json($validator->errors(), 422);
        // Intentamos restablecer la contraseña utilizando el token y los datos proporcionados
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                // Si el restablecimiento es exitoso, actualizamos la contraseña del usuario
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        // Retornamos una respuesta basada en el resultado del intento de restablecimiento de contraseña
        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña restablecida exitosamente'], 200)
            : response()->json(['message' => 'Error al restablecer la contraseña'], 500);
    }
}
