<?php

namespace App\Http\Controllers;

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

        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'sort_by' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
        $data['user_id'] = Auth::user()->id;
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('destinations', 'public');
        }
        $destination = Destination::create($data);

        return response()->json($destination, 201);
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
}
