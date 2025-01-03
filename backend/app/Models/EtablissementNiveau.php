<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtablissementNiveau extends Model
{
    use HasFactory;
    protected $table = 'etablissement_niveau'; // Nom de la table

    // Définir les relations avec les autres modèles, par exemple:
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }
}
