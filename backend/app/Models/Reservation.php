<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Reservation extends Model
{
    protected $fillable = ['user_id', 'travel_details', 'reservation_process', 'payment_options', 'confirmation_code'];
    protected $casts = [
        'travel_details'=>'array',
    ];

    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }

    
}
