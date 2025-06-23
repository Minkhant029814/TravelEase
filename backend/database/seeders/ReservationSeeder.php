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
                'id' => 7,
                'user_id' => 2,
                'destination_id' => 1,
                'confirmation_code' => 'CONF901234',
                'travel_details' => [
                    "start_date" => "2025-06-25",
                    "end_date" => "2025-06-30",
                    "travelers" => 2
                ],
                'status' => 'Confirmed',
                'payment_options' => 'Paid',
                'amount' => '$1,450.00',
            ],
            [
                'id' => 8,
                'user_id' => 2,
                'destination_id' => 1,
                'confirmation_code' => 'CONF901234',
                'travel_details' => [
                    "start_date" => "2025-06-25",
                    "end_date" => "2025-06-30",
                    "travelers" => 2
                ],
                'status' => 'Confirmed',
                'payment_options' => 'Paid',
                'amount' => '$1,450.00',
            ]


        ];

        foreach ($reservations as $res) {
            Reservation::create($res);
        }
    }
}
