<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerServices extends Model
{
    protected $fillable = ['user_id', 'type', 'details'];

    protected $casts = [
        'details'=>'array',
    ];
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    
}
