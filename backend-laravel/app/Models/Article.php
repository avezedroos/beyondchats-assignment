<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'published_at',
        'is_updated',
        'references',
    ];

    // Automatically cast JSON + datetime
    protected $casts = [
        'references' => 'array',
        'published_at' => 'datetime',
        'is_updated' => 'boolean',
    ];
}
