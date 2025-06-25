<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Reservation::all());
    }
    public function store(Request $request): JsonResponse
    {

        $data = $request->validate([

            'destination_id' => 'required',
            'travel_details' => 'required|array',
            'payment_options' => 'required|string',
            'confirmation_code' => 'required|string',
            'status' => 'string',
            'amount' => 'required'
        ]);
        $data['travel_details'] = json_encode($data['travel_details']);
        $data['user_id'] = Auth::user()->id;
        $reservation = Reservation::create($data);
        return response()->json($reservation, 201);
    }

    public function show($id): JsonResponse
    {
        $reservation = Reservation::with('user', 'destination')->findOrFail($id);
        return response()->json($reservation, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $reservation = Reservation::findOrFail($id);
        $data = $request->validate([
            'travel_details' => 'array',
            'reservation_process' => 'string',
            'status' => 'string',
            'payment_options' => 'string',
            'confirmation_code' => 'string|unique:reservations,confirmation_code,' . $id
        ]);

        $reservation->update($data);
        return response()->json($reservation);
    }

    public function destroy($id): JsonResponse
    {

        $reservation = Reservation::findOrFail($id);
        $reservation->delete();
        return response()->json(null, 204);
    }

    public function upComingTrips($user_id): JsonResponse
    {
        $reservation = Reservation::with('user', 'destination')->where('status', 'Up Coming')->where('user_id', $user_id)->get();
        return response()->json($reservation, 200);
    }

    public function pastTrips($user_id): JsonResponse
    {
        $reservation = Reservation::with('user', 'destination')->where('status', 'Completed')->where('user_id', $user_id)->get();
        return response()->json($reservation, 200);
    }
}
