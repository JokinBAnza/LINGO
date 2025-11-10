<?php

namespace App\Http\Controllers;

use App\Models\Partida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partidas = Partida::where('ganada', true)->orderBy('tiempo')->take(10)->get();
        return view('partidas.index', ['partidas' => $partidas]);
    }

    public function indexStyled()
    {
        $partidas = Partida::all();
        return view('partidas.indexStyled', ['partidas' => $partidas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tiempo' => 'required|integer|min:0',
            'ganada' => 'required|boolean',
        ]);

        Partida::create([
            'jugador' => Auth::user()->name,
            'tiempo' => $request->tiempo,
            'ganada' => $request->ganada,
        ]);

        return response()->json(['ok' => true]);
    }
    
public function estadisticas()
{
    $user = Auth::user()->name;

    $victorias = Partida::where('jugador', $user)->where('ganada', true)->count();
    $derrotas  = Partida::where('jugador', $user)->where('ganada', false)->count();

     $puntuacion = ($victorias * 10) - ($derrotas * 5);

    return view('LINGO', compact('victorias', 'derrotas', 'puntuacion'));
}



    /**
     * Display the specified resource.
     */
    public function show(Partida $partida)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partida $partida)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partida $partida)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partida $partida)
    {
        //
    }
}