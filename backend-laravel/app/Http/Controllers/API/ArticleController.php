<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::orderBy('published_at', 'asc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        $data['slug'] = Str::slug($data['title']);

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->only(['title', 'content', 'image', 'published_at', 'is_updated', 'references']);
        if(isset($data['title'])) $data['slug'] = Str::slug($data['title']);

        $article->update($data);

        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
