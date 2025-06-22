<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'sort_by',
        'description',
        'image'
    ];

    public function user(): BelongsTo
    {

        return $this->belongsTo(User::class);
    }

    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
