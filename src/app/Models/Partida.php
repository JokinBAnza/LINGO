<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Partida extends Model
{
    use HasFactory;
    protected $fillable = [
        'jugador',
        'tiempo',
        'ganada',
    ];
}
