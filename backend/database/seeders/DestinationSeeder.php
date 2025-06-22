<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use App\Models\Destination;
use App\Models\Review;
use App\Models\User;


class DestinationSeeder extends Seeder
{
    public function run(): void

    {
        $userId = User::first()->id;
        $destinations = [
            [
                'id' => 1,
                'name' => 'Bali, Indonesia',
                'description' => 'Tropical paradise with beautiful beaches and rich cultural heritage.',
                'long_description' => 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.',
                'sort_by' => 'Asian',
                'image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
                'activities' => [
                    [
                        'id' => 1,
                        'name' => 'Beach Day at Kuta',
                        'description' => 'Relax on the famous Kuta Beach with golden sands and surfing opportunities.',
                        'image' => 'https://images.unsplash.com/photo-1588625500633-a0cd518f0f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 2,
                        'name' => 'Ubud Monkey Forest',
                        'description' => 'Visit the sacred sanctuary with over 700 monkeys and ancient temples.',
                        'image' => 'https://images.unsplash.com/photo-1584555613483-3b107aa8ba23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 3,
                        'name' => 'Tegallalang Rice Terraces',
                        'description' => 'Explore the stunning stepped rice fields using traditional Balinese irrigation.',
                        'image' => 'https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
                    ],
                ],
                'reviews' => [
                    [
                        'id' => 1,
                        'user' => 'Sarah M.',
                        'rating' => 5,
                        'comment' => 'Absolutely stunning! The beaches were pristine and the locals were so friendly.',
                        'date' => '2 months ago',

                    ],
                    [
                        'id' => 2,
                        'user' => 'James L.',
                        'rating' => 4,
                        'comment' => 'Beautiful island with so much to see. The traffic can be challenging though.',
                        'date' => '5 months ago',
                    ],
                ],
            ],

            [
                'id' => 2,
                'name' => 'Kyoto, Japan',
                'description' => 'Historic city famous for temples, gardens, and traditional tea ceremonies.',
                'long_description' => 'Kyoto, once the capital of Japan, is known for its classical Buddhist temples, imperial palaces, Shinto shrines, and traditional wooden houses. It’s also famous for kaiseki dining and geisha entertainment in the Gion district.',
                'sort_by' => 'Asian',
                'image' => 'https://images.unsplash.com/photo-1584352500337-570ee340bd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                'activities' => [
                    [
                        'id' => 1,
                        'name' => 'Fushimi Inari Shrine',
                        'description' => 'Walk through thousands of red torii gates up the sacred Mount Inari.',
                        'image' => 'https://images.unsplash.com/photo-1591951425328-48c123a2757e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 2,
                        'name' => 'Arashiyama Bamboo Grove',
                        'description' => 'Stroll through an enchanting forest of towering bamboo in western Kyoto.',
                        'image' => 'https://images.unsplash.com/photo-1575429502673-33124c3c39f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 3,
                        'name' => 'Traditional Tea Ceremony',
                        'description' => 'Experience an authentic Japanese tea ceremony with a local tea master.',
                        'image' => 'https://images.unsplash.com/photo-1612462424976-9b2a7343c372?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                ],
                'reviews' => [
                    [
                        'id' => 1,
                        'user' => 'Sarah M.',
                        'rating' => 5,
                        'comment' => 'Absolutely stunning! The beaches were pristine and the locals were so friendly.',
                        'date' => '2 months ago',

                    ],
                    [
                        'id' => 2,
                        'user' => 'James L.',
                        'rating' => 4,
                        'comment' => 'Beautiful island with so much to see. The traffic can be challenging though.',
                        'date' => '5 months ago',
                    ],
                ],
            ],

            // 3. Paris, France
            [
                'id' => 3,
                'name' => 'Paris, France',
                'description' => 'The city of lights, romance, and timeless culture.',
                'long_description' => 'Paris is renowned for its art, fashion, gastronomy, and culture. Landmarks include the Eiffel Tower, Notre-Dame, the Louvre Museum, and charming cafes lining cobblestone streets.',
                'sort_by' => 'Asian',
                'image' => 'https://images.unsplash.com/photo-1523206489230-c012f1a37f8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                'activities' => [
                    [
                        'id' => 1,
                        'name' => 'Eiffel Tower Visit',
                        'description' => 'Climb or ride to the top of the Eiffel Tower for a panoramic view of Paris.',
                        'image' => 'https://images.unsplash.com/photo-1549221984-2c90a13a4bfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 2,
                        'name' => 'Louvre Museum Tour',
                        'description' => 'Explore the world’s largest art museum and see the Mona Lisa up close.',
                        'image' => 'https://images.unsplash.com/photo-1601050694600-1c5bb0f84f64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 3,
                        'name' => 'Seine River Cruise',
                        'description' => 'Enjoy a romantic boat ride along the Seine, passing Paris’s historic bridges and landmarks.',
                        'image' => 'https://images.unsplash.com/photo-1613472334027-d5887497ce53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                ],
                'reviews' => [
                    [
                        'id' => 1,
                        'user' => 'Sarah M.',
                        'rating' => 5,
                        'comment' => 'Absolutely stunning! The beaches were pristine and the locals were so friendly.',
                        'date' => '2 months ago',

                    ],
                    [
                        'id' => 2,
                        'user' => 'James L.',
                        'rating' => 4,
                        'comment' => 'Beautiful island with so much to see. The traffic can be challenging though.',
                        'date' => '5 months ago',
                    ],
                ],
            ],

            // 4. Cape Town, South Africa
            [
                'id' => 4,
                'name' => 'Cape Town, South Africa',
                'description' => 'A breathtaking city nestled between mountains and ocean.',
                'long_description' => 'Cape Town is known for Table Mountain, beautiful beaches, and Robben Island. It’s a vibrant city offering adventure, nature, and rich South African heritage.',
                'sort_by' => 'Asian',
                'image' => 'https://images.unsplash.com/photo-1505731136146-38e6f9e66854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                'activities' => [
                    [
                        'id' => 1,
                        'name' => 'Table Mountain Cableway',
                        'description' => 'Ride to the top of Table Mountain for panoramic views of the city and sea.',
                        'image' => 'https://images.unsplash.com/photo-1583766395093-130b7cb944c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 2,
                        'name' => 'Boulders Beach Penguins',
                        'description' => 'Visit a beach home to a unique colony of African penguins.',
                        'image' => 'https://images.unsplash.com/photo-1613062114743-d6b0b70f0354?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                    [
                        'id' => 3,
                        'name' => 'Cape Winelands Tour',
                        'description' => 'Enjoy a scenic tour and tasting in one of South Africa’s famous wine regions.',
                        'image' => 'https://images.unsplash.com/photo-1587574293340-47bfb1c121e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
                    ],
                ],
                'reviews' => [
                    [
                        'id' => 1,
                        'user' => 'Sarah M.',
                        'rating' => 5,
                        'comment' => 'Absolutely stunning! The beaches were pristine and the locals were so friendly.',
                        'date' => '2 months ago',

                    ],
                    [
                        'id' => 2,
                        'user' => 'James L.',
                        'rating' => 4,
                        'comment' => 'Beautiful island with so much to see. The traffic can be challenging though.',
                        'date' => '5 months ago',
                    ],
                ],
            ]

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
                    'destination_id' => $destination['id'],
                    'name' => $activityName['name'],
                    'image' => $activityName['image'],
                ]);
            }

            foreach ($dest['reviews'] as $review) {
                // foreach ($reviews as $review) {
                Review::create([
                    'user_id' => $userId,
                    'rating' => $review['rating'],
                    'comment' => $review['comment'],
                    'reservation_id' => 1
                ]);
                // }
            }
        }
    }
}
