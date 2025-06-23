<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Reservation extends Model
{
    protected $fillable = ['user_id', 'destination_id', 'travel_details', 'payment_options', 'confirmation_code', 'status', 'amount'];
    protected $casts = [
        'travel_details' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destination(): BelongsTo
    {

        return $this->belongsTo(Destination::class);
    }
}
