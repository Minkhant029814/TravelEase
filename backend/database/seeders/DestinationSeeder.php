<?php

use App\Models\Activity;
use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\User;


class DestinationSeeder extends Seeder
{
    public function run(): void
    
    { $userId = User::first()->id;
        $destinations = [
            [
                'name' => 'Bali, Indonesia',
                'description' => 'A tropical paradise known for its beaches and temples.',
                'sort_by' => 'Asia',
                'image' => null,
                'activities' => ['Beach', 'Surfing', 'Temples', 'Nightlife'],
            ],
            [
                'name' => 'Kyoto, Japan',
                'description' => 'Famous for its temples, gardens, and tea ceremonies.',
                'sort_by' => 'Asia',
                'image' => null,
                'activities' => ['Temples', 'Gardens', 'Cultural Tours', 'Tea Ceremony'],
            ],
            [
                'name' => 'Paris, France',
                'description' => 'The city of lights, known for its cafes and the Eiffel Tower.',
                'sort_by' => 'Europe',
                'image' => null,
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
                    'destination_id'=>$destination->id,
                    'name'=>$activityName,
                    'image'=>null,
                ]);
            }
        }
    }
}