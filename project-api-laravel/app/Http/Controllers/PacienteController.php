<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;
use Illuminate\Support\Facades\Validator;

class PacienteController extends Controller
{
    public function getPacientes()
    {
        // Obtenemos todos los pacientes de la base de datos
        $pacientes = Paciente::all();

        return response()->json([
            'pacientes' => $pacientes,
            'message' => 'Pacientes obtenidos exitosamente'
        ], 200);
    }

    public function getPaciente($id)
    {
        // Buscamos el paciente por su ID
        $paciente = Paciente::find($id);
        // Si no se encuentra el paciente, retornamos un error 404
        if (!$paciente) return response()->json(['message' => 'Paciente no encontrado'], 404);

        return response()->json([
            'paciente' => $paciente,
            'message' => 'Paciente encontrado'
        ], 200);
    }

    public function store(Request $request)
    {
        // Definimos los campos permitidos para la creación de un paciente
        $camposPermitidos = [
            'dni',
            'nombres',
            'apellidos',
            'fecha_nacimiento',
            'genero',
            'celular',
            'email',
            'tipo_sangre',
            'seguro_medico'
        ];
        // Validamos los datos de entrada utilizando el validador de Laravel
        $validator = Validator::make($request->only($camposPermitidos), [
            'dni' => 'required|unique:pacientes,dni',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'genero' => 'required|string',
            'celular' => 'required|string',
            'email' => 'required|email|unique:pacientes,email',
            'tipo_sangre' => 'nullable|string',
            'seguro_medico' => 'nullable|string',
        ]);
        // Si la validación falla, retornamos los errores con un código de estado 422
        if ($validator->fails()) return response()->json($validator->errors(), 422);
        // Si la validación es exitosa, creamos el nuevo paciente en la base de datos
        $paciente = Paciente::create($request->only($camposPermitidos));

        return response()->json([
            'paciente' => $paciente,
            'message' => 'Paciente creado exitosamente'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Buscamos el paciente por su ID para asegurarnos de que existe antes de intentar actualizarlo
        $paciente = Paciente::find($id);
        // Si no se encuentra el paciente, retornamos un error 404
        if (!$paciente) return response()->json(['message' => 'Paciente no encontrado'], 404);

        // Definimos los campos permitidos para la actualización de un paciente
        $camposPermitidos = [
            'dni',
            'nombres',
            'apellidos',
            'fecha_nacimiento',
            'genero',
            'celular',
            'email',
            'tipo_sangre',
            'seguro_medico'
        ];
        // Validamos los datos de entrada
        $validator = Validator::make($request->only($camposPermitidos), [
            'dni'              => 'required|unique:pacientes,dni,' . $id,
            'nombres'          => 'required|string',
            'apellidos'        => 'required|string',
            'fecha_nacimiento' => 'required|date',
            'genero'           => 'required|string',
            'celular'          => 'required|string',
            'email'            => 'required|email|unique:pacientes,email,' . $id,
            'tipo_sangre'      => 'nullable|string',
            'seguro_medico'    => 'nullable|string',
        ]);
        // Si la validación falla, retornamos los errores con un código de estado 422
        if ($validator->fails()) return response()->json($validator->errors(), 422);
        // Si la validación es exitosa, actualizamos el paciente con los datos proporcionados
        $paciente->update($request->only($camposPermitidos));

        return response()->json([
            'paciente' => $paciente,
            'message' => 'Paciente actualizado exitosamente'
        ], 200);
    }

    public function destroy($id)
    {
        // Buscamos el paciente por su ID para asegurarnos de que existe antes de intentar eliminarlo
        $paciente = Paciente::find($id);
        // Si no se encuentra el paciente, retornamos un error 404
        if (!$paciente) return response()->json(['message' => 'Paciente no encontrado'], 404);
        // Si el paciente existe, lo eliminamos de la base de datos
        $paciente->delete();

        return response()->json(['message' => 'Paciente eliminado exitosamente'], 200);
    }

    public function isActive($id)
    {
        // Buscamos el paciente por su ID para asegurarnos de que existe antes de verificar su estado
        $paciente = Paciente::find($id);
        // Si no se encuentra el paciente, retornamos un error 404
        if (!$paciente) return response()->json(['message' => 'Paciente no encontrado'], 404);
        // Cambiamos el estado del paciente a activo o inactivo dependiendo de su estado actual
        $paciente->estado = !$paciente->estado;
        // Guardamos el cambio en la base de datos
        $paciente->save();

        return response()->json([
            'message' => 'Estado del paciente cambiado exitosamente',
        ], 200);
    }
}
