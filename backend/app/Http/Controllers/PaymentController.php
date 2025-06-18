<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index() : JsonResponse {
        return response()->json(Payment::with('reservation')->get());
    }

    public function store(Request $request) : JsonResponse {
        
        $data = $request->validate([
            'reservation_id'=>'required|exists:reservations,id',
            'amount'=>'required|numeric',
            'payment-status'=>'required|string',
            'transaction_id'=>'required|string|unique:payments',
        ]);
        $data['reservation_id'] = $request->reservation_id;
        $payment = Payment::create($data);
        return response()->json($payment,201);

        
    }
    public function show($id) : JsonResponse {
            $payment = Payment::with('reservation')->findOrFail($id);
            return response()->json($payment);
        }
    public function update(Request $request,$id) : JsonResponse {
        $payment = Payment::findOrFail($id);
        $data = $request->validate([

            'amount'=>'numeric',
            'payment_status'=>'string',
            'transaction_id'=>'string|unique:payments,transaction_id,'.$id,
        ]);

        $payment->update($data);
        return response()->json($payment);

    } 

    public function destroy($id) : JsonResponse {
        $payment = Payment::findOrFail($id);
        $payment->delete();
        return response()->json(null,204);
    }
}
