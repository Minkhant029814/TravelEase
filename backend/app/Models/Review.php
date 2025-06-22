<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = ['user_id', 'reservation_id','destination_id', 'rating', 'comment'];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function reservation() : BelongsTo{
        return $this->belongsTo(Reservation::class);
    }

    public function destinations():BelongsTo {
        return $this->belongsTo(Destination::class);
    }
}
