<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
        ]);
    }

    public function register(Request $request)
    {
        // Validamos los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|same:confirmed_password',
        ]);
        // Si la validación falla, retornamos los errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creamos el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Encriptamos la contraseña antes de guardarla
        ]);

        // Creamos un token de autenticación para el nuevo usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'message' => 'Usuario registrado exitosamente',
        ], 201);
    }
}
