<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paciente extends Model
{
    use HasFactory;

    protected $table = 'pacientes';

    protected $fillable = [
        'dni',
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'genero',
        'celular',
        'email',
        'tipo_sangre',
        'seguro_medico',
        'estado',
    ];
}
