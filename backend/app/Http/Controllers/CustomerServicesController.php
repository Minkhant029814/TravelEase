<?php

namespace App\Http\Controllers;

use App\Models\CustomerServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerServicesController extends Controller
{
    public function index() : JsonResponse {
        return response()->json(CustomerServices::with('user')->get());
    }

    public function store(Request $request) : JsonResponse {
        
        $data = $request->validate([
           
            'type'=>'required|string',
            'details'=>'required|array',
        ]);
        $data['user_id'] = Auth::id();

        $customerService = CustomerServices::create($data);
        return response()->json($customerService,201);
    }

    public function show($id) : JsonResponse {
        
        $customerService = CustomerServices::with('user')->findOrFail($id);
        return response()->json($customerService);
    }

    public function update(Request $request,$id) : JsonResponse{

        $customerService = CustomerServices::with('user')->findOrFail($id);
        $data = $request->validate([
            'type'=>'string',
            'details'=>'array',
        ]);

        $customerService->update($data);
        return response()->json($customerService);
        
    }

    public function destroy($id) : JsonResponse{
        $customerService = CustomerServices::findOrFail($id);
        $customerService->delete();
        return response()->json(null,204);
    }
}
