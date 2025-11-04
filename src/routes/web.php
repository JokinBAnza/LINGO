<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PalabraController;

// Página de inicio
Route::get('/', function () {
    return view('welcome');
});


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
