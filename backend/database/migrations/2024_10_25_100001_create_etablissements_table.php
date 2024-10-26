<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtablissementsTable extends Migration
{
    public function up()
    {
        Schema::create('etablissements', function (Blueprint $table) {
            $table->id();
            $table->string('nom_etablissement');
            $table->string('adresse');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('etablissements');
    }
}
