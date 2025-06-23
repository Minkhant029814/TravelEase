<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(): JsonResponse
    {

        return response()->json(Review::with(['user', 'reservation'])->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([

            'reservation_id' => 'required|exists:reservations,id',
            'destination_id' => 'required|exists:destinations,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',

        ]);

        $data['user_id'] = Auth::user()->id;
        $review = Review::create($data);
        return response()->json($review, 201);
    }

    public function show($id): JsonResponse
    {
        $review = Review::with(['user', 'reservation'])->findOrFail($id);
        return response()->json($review);
    }

    public function update(Request $request, $id): JsonResponse
    {

        $review = Review::findOrFail($id);
        $data = $request->validate([
            'rating' => 'integer|min:1|max:5',
            'comment' => 'string',
        ]);
        $review->update($data);
        return response()->json($review);
    }

    public function destroy($id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }

    public function getReviewsByReservationId($id): JsonResponse
    {
        $review = Review::with('user')->where('reservation_id', $id)->get();
        return response()->json($review, 200);
    }
}
