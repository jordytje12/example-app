<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blogs::all();

        return Inertia::render('blogs/Index')->with('blogs', $blogs);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|max:10240|mimetypes:text/csv,text/plain',
        ]);
        $file = $validated['file'];
        $path = $file->store('files', 'public');

        return Inertia::render('blogs/Index')->with('message', 'File uploaded successfully.');
    }
    public function create()
    {
        return Inertia::render('blogs/Create');
    }
    public function show(String $id)
    {
        $blog = Blogs::findOrFail($id);

        return Inertia::render('blogs/Show')->with('blog', $blog);
    }
}
