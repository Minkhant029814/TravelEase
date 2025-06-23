<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reservations = [
            [
                'id' => 5,
                'user_id' => 2,
                'destination_id' => 1,
                'confirmation_code' => 'CONF901234',
                'travel_details' => "test",
                'status' => 'Confirmed',
                // 'reservation_process' => 'inprogress',
                'payment_options' => 'Paid',
                'amount' => '$1,450.00',
            ],
            [
                'id' => 6,
                'user_id' => 2,
                'destination_id' => 2,
                'confirmation_code' => 'CONF901234',
                // 'reservation_process' => 'inprogress',
                'travel_details' => 'test',
                'status' => 'Confirmed',
                'payment_options' => 'Paid',
                'amount' => '$1,450.00',
            ],


        ];

        foreach ($reservations as $res) {
            Reservation::create($res);
        }
    }
}
