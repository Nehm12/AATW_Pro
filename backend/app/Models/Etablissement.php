<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_etablissement',
        'adresse',
    ];

    // Relation avec les classes
    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function niveaux()
    {
        return $this->belongsToMany(Niveau::class, 'etablissement_niveau');
    }
}
