<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnfantsTable extends Migration
{
    public function up()
    {
        Schema::create('enfants', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->date('date_naissance');
            $table->unsignedBigInteger('parent_id'); // Clé étrangère vers parent
            $table->unsignedBigInteger('etablissement_id'); // Clé étrangère vers établissement
            $table->unsignedBigInteger('classe_id'); // Clé étrangère vers classe
            $table->timestamps();

            // Définir les clés étrangères
            $table->foreign('parent_id')->references('id')->on('parent')->onDelete('cascade');
            $table->foreign('classe_id')->references('id')->on('classes')->onDelete('cascade');
            $table->foreign('etablissement_id')->references('id')->on('etablissements')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('enfants');
    }
}
