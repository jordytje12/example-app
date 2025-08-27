<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('blogs-genereren', [BlogController::class, 'index'])->name('blogs-genereren');
    Route::post('blogs-genereren', [BlogController::class, 'store'])->name('blogs-genereren.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
