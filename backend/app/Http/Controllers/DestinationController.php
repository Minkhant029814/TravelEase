<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Destination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DestinationController extends Controller
{
    public function index(): JsonResponse
    {
        $destinations = Destination::with('user', 'activities', 'reviews')->get()->map(function ($destination) {
            $destination->image = $destination->image ? asset("/storage/" . $destination->image) : null;
            return $destination;
        });

        return response()->json($destinations);
    }
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'amount' => 'required|integer',
            'image' => 'nullable|image|max:2048',
            'activities' => 'nullable|array',
            'activities.*.name' => 'required|string',
            'activities.*.image' => 'nullable|image|max:2048',
            'user_id' => 'required|exists:users,id',
        ]);

        // Handle destination image
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('destinations', 'public');
        }

        // Create the destination
        $destination = Destination::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'image' => $validated['image'] ?? null,
            'user_id' => $validated['user_id'],
        ]);

        // Handle dynamic activities
        if ($request->has('activities') && is_array($request->activities)) {
            foreach ($request->activities as $index => $activityInput) {
                // Manually extract each activity from the request
                $activity = [
                    'name' => $activityInput['name'],
                    'destination_id' => $destination->id,
                ];

                // Handle activity image upload
                if (isset($activityInput['image']) && $activityInput['image'] instanceof \Illuminate\Http\UploadedFile) {
                    $activity['image'] = $activityInput['image']->store('activities', 'public');
                }

                Activity::create($activity);
            }
        }

        return response()->json($destination->load('activities'), 201);
    }



    public function show($id): JsonResponse
    {
        $destination = Destination::with('user', 'activities', 'reviews')->findOrFail($id);

        // Convert image path to full URL
        if ($destination->image) {
            $destination->image = asset('storage/' . $destination->image);
        }

        // Also convert activity images if they exist
        if ($destination->activities) {
            $destination->activities->transform(function ($activity) {
                if ($activity->image) {
                    $activity->image = asset('storage/' . $activity->image);
                }
                return $activity;
            });
        }

        return response()->json($destination);
    }

    public function  update(Request $request, $id): JsonResponse
    {

        $destination = Destination::findOrFail($id);
        $data = $request->validate([
            'name' => 'string',
            'description' => 'string',
            'sort_by' => 'string',
            'image' => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('image')) {
            if ($destination->image) Storage::delete($destination->image);
            $data['image'] = $request->file('image')->store('destinations', 'public');
        }
        $destination->update($data);
        return response()->json($destination);
    }

    public function destroy($id): JsonResponse
    {
        $destination = Destination::findOrFail($id);
        if ($destination->image) Storage::delete($destination->image);
        $destination->delete();
        return response()->json(null, 204);
    }

    public function getFeaturedDestinations()
    {
        // Load all destinations with their reviews
        $destinations = Destination::with('reviews')->get();

        // Filter by average rating > 3
        $filtered = $destinations->filter(function ($destination) {
            $average = $destination->reviews->avg('rating');
            return $average > 3;
        });

        // Take only 4 and add the average manually
        $result = $filtered->take(4)->map(function ($destination) {
            $destination->average_rating = round($destination->reviews->avg('rating'), 1);
            return $destination;
        });

        return response()->json($result->values());
    }
}
