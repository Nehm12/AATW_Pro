<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('parent')->insert([
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'nom' => 'Admin',
            'prenom' => 'Admin',
            'telephone' => '90820159',
            'password' => Hash::make('B@B@h0me'),  // Utilise la fonction Hash de Laravel
            'role' => 'admin',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('parent')->where('email', 'admin@gmail.com')->delete();
    }
}
