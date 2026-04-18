<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PacienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pacientes')->insert([
            [
                'dni' => '12345678',
                'nombres' => 'Juan',
                'apellidos' => 'Pérez',
                'fecha_nacimiento' => '1990-01-01',
                'genero' => 'Masculino',
                'celular' => '555123456',
                'email' => 'juan.perez@example.com',
                'tipo_sangre' => 'O+',
                'seguro_medico' => 'OSDE',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dni' => '87654321',
                'nombres' => 'María',
                'apellidos' => 'López',
                'fecha_nacimiento' => '1985-05-15',
                'genero' => 'Femenino',
                'celular' => '555987654',
                'email' => 'maria.lopez@example.com',
                'tipo_sangre' => 'A-',
                'seguro_medico' => 'Swiss Medical',
                'estado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dni' => '11223344',
                'nombres' => 'Carlos',
                'apellidos' => 'Gómez',
                'fecha_nacimiento' => '1978-09-23',
                'genero' => 'Masculino',
                'celular' => '555112233',
                'email' => 'carlos.gomez@example.com',
                'tipo_sangre' => 'B+',
                'seguro_medico' => null,
                'estado' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
