<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_classe',
    ];


    // Relation avec les enfants
    public function enfants()
    {
        return $this->hasMany(Enfant::class);
    }

    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class);
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class);
    }


}
