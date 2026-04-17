<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->string('dni', 12)->unique();
            $table->string('nombres', 100);
            $table->string('apellidos', 100);
            $table->date('fecha_nacimiento');
            $table->enum('genero', ['Masculino', 'Femenino', 'Otro']);
            $table->string('celular', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('tipo_sangre', 5);
            $table->string('seguro_medico', 50)->nullable();
            $table->boolean('estado')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
