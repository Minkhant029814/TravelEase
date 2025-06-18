<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    protected $fillable = [
        'destination_id','name','image'
    ];
    public function destination() : BelongsTo {
        return $this->belongsTo(Destination::class);
    }
}
