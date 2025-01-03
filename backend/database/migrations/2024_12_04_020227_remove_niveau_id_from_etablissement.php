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
        // Supprimer la colonne niveau_id de la table etablissements
        Schema::table('etablissements', function (Blueprint $table) {
            $table->dropColumn('niveau_id');
        });
    }

    public function down()
    {
        // Si besoin de revenir en arrière, vous pouvez rajouter la colonne niveau_id ici
        Schema::table('etablissements', function (Blueprint $table) {
            $table->unsignedBigInteger('niveau_id')->nullable();
        });
    }
};
