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
                'nombre' => 'Juan Pérez',
                'dni' => '12345678',
                'fecha_nacimiento' => '1990-01-01',
                'direccion' => 'Calle Falsa 123',
                'telefono' => '555123456',
                'email' => 'juan.perez@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'María López',
                'dni' => '87654321',
                'fecha_nacimiento' => '1985-05-15',
                'direccion' => 'Av. Siempre Viva 742',
                'telefono' => '555987654',
                'email' => 'maria.lopez@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Carlos Gómez',
                'dni' => '11223344',
                'fecha_nacimiento' => '1978-09-23',
                'direccion' => 'Boulevard Central 100',
                'telefono' => '555112233',
                'email' => 'carlos.gomez@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
