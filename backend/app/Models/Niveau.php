<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $fillable = ['nom_niveau'];

    // Relation avec les établissements
    public function etablissements()
    {
        return $this->belongsToMany(Etablissement::class, 'etablissement_niveau');
    }

    
}
