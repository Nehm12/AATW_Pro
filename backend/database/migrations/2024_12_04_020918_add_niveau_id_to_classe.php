<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Ajouter la colonne niveau_id à la table classe
        Schema::table('classes', function (Blueprint $table) {
            $table->unsignedBigInteger('niveau_id')->nullable();

            // Ajouter la contrainte de clé étrangère
            $table->foreign('niveau_id')->references('id')->on('niveaux')->onDelete('set null');
        });
    }

    public function down()
    {
        // Supprimer la colonne niveau_id et la clé étrangère
        Schema::table('classes', function (Blueprint $table) {
            $table->dropForeign(['niveau_id']);
            $table->dropColumn('niveau_id');
        });
    }
};
