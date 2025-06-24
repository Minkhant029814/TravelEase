<?php


namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\User;


class DestinationSeeder extends Seeder
{
    public function run(): void

    {
        $userId = User::first()->id;
        $destinations = [
            [
                'name' => 'Bali, Indonesia',
                'description' => 'A tropical paradise known for its beaches and temples.',
                'sort_by' => 'Asia',
                'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Bali beach
                'activities' => ['Beach', 'Surfing', 'Temples', 'Nightlife'],
            ],
            [
                'name' => 'Kyoto, Japan',
                'description' => 'Famous for its temples, gardens, and tea ceremonies.',
                'sort_by' => 'Asia',
                'image' => 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80', // Kyoto temple
                'activities' => ['Temples', 'Gardens', 'Cultural Tours', 'Tea Ceremony'],
            ],
            [
                'name' => 'Paris, France',
                'description' => 'The city of lights, known for its cafes and the Eiffel Tower.',
                'sort_by' => 'Europe',
                'image' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', // Paris Eiffel Tower
                'activities' => ['Museums', 'Shopping', 'Cafes', 'Landmarks'],
            ],
        ];


        foreach ($destinations as $dest) {
            $destination = Destination::create([
                'name' => $dest['name'],
                'description' => $dest['description'],
                'sort_by' => $dest['sort_by'],
                'image' => $dest['image'],
                'user_id' => $userId,
            ]);
            foreach ($dest['activities'] as $activityName) {
                Activity::create([
                    'destination_id' => $destination->id,
                    'name' => $activityName,
                    'image' => null,
                ]);
            }
        }
    }
}
