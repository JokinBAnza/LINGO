<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PalabraController;
use App\Http\Controllers\PartidaController;


// Página de inicio
Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');


//LINGO
Route::get('/lingo', function () {
    return view('LINGO');
})->middleware(['auth'])->name('lingo');

//Acierto
Route::get('/acierto', function () {
    return view('Acierto');
})->middleware('auth')->name('acierto');

// Fallo
Route::get('/fallo', function () {
    return view('Fallo');
})->middleware('auth')->name('fallo');

//Tabla Partidas
Route::post('/partidas', [PartidaController::class, 'store'])->middleware('auth');

// Ranking / Mejores partidas
Route::get('/partidas', [PartidaController::class, 'index'])
    ->middleware('auth')
    ->name('partidas.index');



// Perfil (auth)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas de PalabraController
Route::get('/palabras', [PalabraController::class, 'index'])->name('palabras.index');
Route::get('/palabrasStyled', [PalabraController::class, 'indexStyled'])->name('palabras.indexStyled');
Route::get('/palabrasBlade', [PalabraController::class, 'indexBlade'])->name('palabras.indexBlade');
Route::get('/palabrasRandom/{cantidad?}', [PalabraController::class, 'indexRandom'])->name('palabras.indexRandom');

require __DIR__.'/auth.php';
