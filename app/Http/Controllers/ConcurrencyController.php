<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use App\Events\FileUploaded;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Concurrency;

class ConcurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $files = File::all();
        [$userCount] = Concurrency::run([
            fn () => DB::table('users')->count(),
        ]);
        Context::add([
            'url', $request->url(),
            'user_id', Auth::id(),
        ]);
        Context::push('default', 'first_value', 'second_value');
        Context::push('default', 'third_value');

        Log::info(Context::all());

        if(Context::stackContains('default', 'first_value')) {
            Log::info('true');
        } else {
            Log::info('false');
        };
        $data = Context::get('default');

        return Inertia::render('concurrency', [
            'userCount' => $userCount,
            'data' => $data,
            'files' => $files,
        ]);
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
        $data = $request->validate([
            'file' => 'required|file|max:10240',
        ]);
        $file = $data['file'];
        $path = $file->store('files', 'public');
        $doc = File::create([
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
        ]);
        // Dispatch the event
        event(new FileUploaded($doc, Auth::user()));
        return redirect()->route('concurrency')->with('status', 'Bestand opgeslagen');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
