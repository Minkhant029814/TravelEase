<?php

namespace Database\Seeders;

use App\Models\TravelTip;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TravelTipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tips = [
            [
                'id' => 1,
                'title' => "Essential Packing Tips for Every Traveler",
                'content' =>
                "Learn how to pack efficiently and never forget important items. Start by making a list of essentials based on your destination and trip duration. Roll clothes instead of folding to save space and prevent wrinkles. Use packing cubes to organize items by category. Always pack a basic first aid kit and keep important documents and valuables in your carry-on.",
                'category' => "Preparation",
                'read_time' => "5 min read",
                'image' =>
                "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
            ],
            [
                'id' => 2,
                'title' => "How to Find the Best Local Cuisine",
                'content' =>
                "Discover authentic local food experiences wherever you travel. Research traditional dishes before you arrive. Ask hotel staff or local residents for recommendations instead of relying solely on tourist guides. Look for restaurants filled with locals rather than tourists. Consider taking a food tour early in your trip to get oriented. Visit local markets to sample fresh ingredients and street food.",
                'category' => "Food & Dining",
                'read_time' => "4 min read",
                'image' =>
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
            ],
            [
                'id' => 3,
                'title' => "Budget Travel Strategies That Work",
                'content' =>
                "Travel more while spending less with these proven strategies. Book flights 2-3 months in advance and use incognito mode when searching. Consider traveling during shoulder seasons for lower prices and fewer crowds. Use public transportation instead of taxis. Look into city passes that combine multiple attractions. Stay in accommodations with kitchen access to save on meal costs.",
                'category' => "Budget",
                'read_time' => "6 min read",
                'image' =>
                "https://images.unsplash.com/photo-1580458148391-8c4951dc1465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            ],
            [
                'id' => 4,
                'title' => "Staying Safe While Traveling Solo",
                'content' =>
                "Essential safety tips for solo travelers around the world. Research your destination thoroughly before arrival. Share your itinerary with family or friends. Keep digital copies of important documents. Trust your instincts and be aware of common scams in the area. Consider joining group tours for certain activities. Stay in well-reviewed accommodations in safe neighborhoods.",
                'category' => "Safety",
                'read_time' => "7 min read",
                'image' =>
                "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
            ],
            [
                'id' => 5,
                'title' => "How to Beat Jet Lag Naturally",
                'content' =>
                "Practical strategies to minimize jet lag and enjoy your trip from day one. Start adjusting your sleep schedule a few days before departure. Stay hydrated before, during, and after your flight. Avoid alcohol and caffeine on the plane. Get exposure to natural sunlight at your destination. Take short naps (20-30 minutes) if needed, but try to stay awake until the local bedtime.",
                'category' => "Health",
                'read_time' => "5 min read",
                'image' =>
                "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
            ],
            [
                'id' => 6,
                'title' => "Photography Tips for Travelers",
                'content' =>
                "Capture stunning travel memories with these photography techniques. Wake up early to catch the golden hour light and avoid crowds. Research photo spots before you arrive but also explore off the beaten path. Learn the basic rules of composition like the rule of thirds. Include people in some shots to add scale and storytelling. Back up your photos regularly while traveling.",
                'category' => "Photography",
                'read_time' => "8 min read",
                'image' =>
                "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
            ],
        ];

        foreach ($tips as $tip) {
            TravelTip::create($tip);
        }
    }
}
