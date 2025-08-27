<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('blogs-genereren');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|max:10240|mimetypes:text/csv,text/plain',
        ]);
        $file = $validated['file'];
        $path = $file->store('files', 'public');

        return Inertia::render('blogs-genereren');
    }
}
